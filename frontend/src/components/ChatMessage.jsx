import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import Typewriter from './Typewriter';
import DiagnosisCard from './DiagnosisCard';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full ${isBot ? 'justify-start md:pr-16' : 'justify-end md:pl-16'}`}
    >
      <div className={`flex gap-2 sm:gap-3 max-w-[95%] md:max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          isBot ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'
        }`}>
          {isBot ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
        </div>
        
        {/* Message Bubble container */}
        <div className="flex flex-col min-w-0 max-w-full">
          <div className={`
            px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-[15px] leading-relaxed break-words whitespace-pre-wrap
            ${isBot 
              ? 'glass-panel text-white rounded-2xl rounded-tl-sm' 
              : 'bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white rounded-2xl rounded-tr-sm shadow-xl backdrop-blur-sm'
            }
          `}>
            {isBot ? <Typewriter text={message.text} /> : message.text}
          </div>
          
          {/* Action Card conditional rendering inside bot response container */}
          {message.diagnosis && (
            <DiagnosisCard diagnosis={message.diagnosis} />
          )}
        </div>
        
      </div>
    </motion.div>
  );
};

export default ChatMessage;
