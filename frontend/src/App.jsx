import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Send, Activity } from 'lucide-react'
import ChatMessage from './components/ChatMessage'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello. I am your Health Symptom Checker assistant. Please describe your symptoms in detail.",
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    const newMessage = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/analyze-symptoms', {
        description: userText
      });
      
      const diagnosis = {
        possible_causes: response.data.possible_causes,
        triage_level: response.data.triage_level,
        home_remedies: response.data.home_remedies,
      };

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: "Here is what I found based on your symptoms:",
        diagnosis: diagnosis
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: "I'm having trouble connecting to my medical database. Please try again later."
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full px-3 py-3 sm:p-6 lg:p-8 xl:p-12 transition-all duration-300">
      {/* Header */}
      <header className="mb-6 flex items-center gap-3">
        <Activity className="w-8 h-8 text-cyan-400" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          VitalAI
        </h1>
      </header>

      {/* Chat Container */}
      <main className="flex-1 glass-panel rounded-3xl overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {/* Loading State */}
          {loading && (
             <div className="flex justify-start">
               <div className="glass-panel text-white px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                 <Activity className="w-5 h-5 text-cyan-400 animate-pulse-fast" />
                 <span className="animate-pulse">Analyzing symptoms...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe what you're feeling..."
              className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white hover:opacity-90 disabled:opacity-50 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
