import os
import json
from google import genai
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
    
@app.get("/")
def read_root():
    return {"message": "Welcome to the Health Symptom Checker API (Powered by Gemini)"}

@app.post("/analyze-symptoms", response_model=SymptomResponse)
def analyze_symptoms(request: SymptomRequest):
    fallback_response = {
        "possible_causes": ["Unable to analyze symptoms at this time due to a system error"],
        "triage_level": "Consult",
        "home_remedies": ["Please consult a medical professional or try again later."]
    }

    if not API_KEY:
         print("Error: GEMINI_API_KEY environment variable is not set. Using fallback response.")
         return fallback_response

    try:
        # Initialize the client
        client = genai.Client(api_key=API_KEY)
        
        prompt = f"""
        Act as a medical triage assistant. Based on the symptoms described below, return a JSON object with strictly these keys:
        - "possible_causes" (array of strings)
        - "triage_level" (string: must be exactly one of "Emergency", "Consult", or "Home Care")
        - "home_remedies" (array of strings)
        
        Specific Validation Check: If the user mentions 'vomiting' or 'stomach pain', ensure the 'possible_causes' reflect gastrointestinal issues, NOT respiratory ones like the flu or cold.
        
        User Symptoms:
        {request.description}
        """

        # Enforce that the LLM responds in parseable JSON matching the description
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        
        # Parse the output into a Python Dictionary natively
        result_json = json.loads(response.text)
        
        # The return value will automatically be validated against SymptomResponse by FastAPI/Pydantic structure
        return result_json
        
    except json.JSONDecodeError:
        print("Failed to decode JSON from model response:", response.text if 'response' in locals() else "No response")
        return fallback_response
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return fallback_response
