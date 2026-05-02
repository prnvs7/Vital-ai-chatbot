import os
import json
import time
import asyncio
from google import genai
from google.genai import types
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

# Load environment variables (e.g. GEMINI_API_KEY from .env)
load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request and response validation
class SymptomRequest(BaseModel):    
    description: str

class SymptomResponse(BaseModel):
    possible_causes: List[str]
    triage_level: str
    home_remedies: List[str]

# Gemini API Key will be used to initialize the client
API_KEY = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY) if API_KEY else None

@app.get("/")
def read_root():
    return {"message": "Welcome to the Health Symptom Checker API (Powered by Gemini)"}

@app.post("/analyze-symptoms", response_model=SymptomResponse)
async def analyze_symptoms(request: SymptomRequest):
    fallback_response = {
        "possible_causes": ["Unable to analyze symptoms at this time due to a system error"],
        "triage_level": "Consult",
        "home_remedies": ["Please consult a medical professional or try again later."]
    }

    if not client:
         print("Error: GEMINI_API_KEY environment variable is not set. Using fallback response.")
         return fallback_response

    # Prompt optimization: Keep it concise and specific
    prompt = f"""
    Act as a medical triage assistant. Return a JSON object with exactly these keys:
    - "possible_causes" (array of strings)
    - "triage_level" (string: exactly one of "Emergency", "Consult", or "Home Care")
    - "home_remedies" (array of strings)
    
    Rule: If 'vomiting' or 'stomach pain' are mentioned, favor gastrointestinal causes.

    User Symptoms:
    {request.description}
    """

    max_attempts = 4 # 1 initial attempt + 3 retries
    backoff_times = [2, 4, 6] # Exponential-ish backoff in seconds
    
    for attempt in range(max_attempts):
        try:
            start_time = time.time()
            print(f"[{time.strftime('%X')}] Sending request to Gemini... (Attempt {attempt + 1}/{max_attempts})")
            
            # Async execution with 10 seconds timeout to prevent infinite hanging
            response = await asyncio.wait_for(
                client.aio.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_mime_type="application/json",
                    )
                ),
                timeout=10.0
            )
            
            elapsed_time = time.time() - start_time
            print(f"[{time.strftime('%X')}] Received response in {elapsed_time:.2f} seconds.")
            
            # Always extract response.text directly
            response_text = response.text
            
            # Parse the output into a Python Dictionary natively
            result_json = json.loads(response_text)
            
            # The return value will automatically be validated against SymptomResponse
            return result_json
            
        except asyncio.TimeoutError:
            print(f"[{time.strftime('%X')}] Error: Gemini API request timed out after 10 seconds.")
            if attempt < max_attempts - 1:
                print(f"Retrying in {backoff_times[attempt]} seconds...")
                await asyncio.sleep(backoff_times[attempt])
                continue
            return fallback_response
            
        except json.JSONDecodeError:
            # Fallback if the AI generates something that isn't parseable JSON
            print(f"[{time.strftime('%X')}] Error: Failed to decode JSON from model response.")
            if attempt < max_attempts - 1:
                print(f"Retrying in {backoff_times[attempt]} seconds...")
                await asyncio.sleep(backoff_times[attempt])
                continue
            return fallback_response
            
        except Exception as e:
            print(f"[{time.strftime('%X')}] Error calling Gemini: {str(e)}")
            if attempt < max_attempts - 1:
                print(f"Retrying in {backoff_times[attempt]} seconds...")
                await asyncio.sleep(backoff_times[attempt])
                continue
            return fallback_response
            
    # If all attempts fail, safely return fallback
    return fallback_response
