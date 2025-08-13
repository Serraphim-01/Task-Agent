'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowDown } from 'lucide-react';
import { config } from '@/config/config';
import { ChatMessage, taskAgentAPI } from '@/lib/api';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { QuickActionChips } from './QuickActionChips';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface ChatWindowProps {
  selectedCompany?: string;
}

export function ChatWindow({ selectedCompany }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'agent',
      content: 'Hello! I\'m your Task Systems Agent. I can help you with account information, subscription details, API usage, and troubleshooting. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (config.api.n8nUrl.includes('replace-with-your-n8n-instance.com')) {
      toast.warning('n8n URL is not configured. Please check the documentation.', {
        duration: Infinity,
      });
    }
  }, []);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await taskAgentAPI.sendMessage(messageText, selectedCompany);
      
      const agentMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: 'agent',
        content: response.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      
      if (response.status === 'success') {
        toast.success('Message sent successfully');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong, please try again.';
      
      const errorResponse: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'agent',
        content: `I apologize, but I encountered an error: ${errorMessage}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Messages */}
      <ScrollArea 
        className="flex-1 px-4 pt-4" 
        ref={scrollAreaRef}
        onScrollCapture={handleScroll}
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatBubble 
              key={message.id} 
              message={message}
              isLatest={message.id === messages[messages.length - 1]?.id}
            />
          ))}
          
          <AnimatePresence>
            {isLoading && <TypingIndicator />}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-32 right-8"
          >
            <Button
              size="sm"
              onClick={scrollToBottom}
              className="rounded-full shadow-lg"
            >
              <ArrowDown size={16} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Input */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto p-4">
          <QuickActionChips 
            onActionClick={handleQuickAction}
            disabled={isLoading}
          />
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
              maxLength={500}
            />
            <Button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send size={16} />
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Agent responses are powered by n8n automation
          </p>
        </div>
      </div>
    </div>
  );
}