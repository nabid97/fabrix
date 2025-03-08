import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useChatbot } from '../../contexts/ChatbotContext';
import { Send, X, MessageCircle } from 'lucide-react';

const Chatbot = () => {
  const { messages, isOpen, isLoading, sendMessage, toggleChatbot, resetChat } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition-colors z-50"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 flex justify-between items-center">
        <h3 className="font-medium">FabriX Assistant</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetChat}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Reset chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
          </button>
          <button
            onClick={toggleChatbot}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-[85%] ${
                message.sender === 'user'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-3">
            <div className="inline-block rounded-lg px-4 py-2 bg-white text-gray-800 border border-gray-200">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-teal-600 text-white px-4 rounded-r-lg hover:bg-teal-700 transition-colors flex items-center justify-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500">
          <span>Need more help? </span>
          <Link to="/contact" className="text-teal-600 hover:underline">
            Contact us
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;