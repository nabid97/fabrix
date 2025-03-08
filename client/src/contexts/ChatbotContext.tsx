import { createContext, useState, useContext, ReactNode } from 'react';
import { generateAIResponse } from '../api/chatbotApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotContextType {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  toggleChatbot: () => void;
  resetChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider = ({ children }: ChatbotProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! Welcome to FabriX. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send message to AI model and get response
      const response = await generateAIResponse(text, messages);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Would you like to fill out our contact form for assistance from our team?",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Hi there! Welcome to FabriX. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  const value = {
    messages,
    isOpen,
    isLoading,
    sendMessage,
    toggleChatbot,
    resetChat,
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};