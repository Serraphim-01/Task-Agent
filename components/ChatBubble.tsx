'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '@/lib/api';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ChatBubbleProps {
  message: ChatMessage;
  isLatest?: boolean;
}

export function ChatBubble({ message, isLatest }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(
      message.timestamp.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    );
  }, [message.timestamp]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex gap-3 mb-4', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium',
          isUser ? 'bg-primary' : 'bg-secondary'
        )}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div className={cn('max-w-[80%] sm:max-w-[70%]', isUser ? 'items-end' : 'items-start')}>
        <motion.div
          className={cn(
            'px-4 py-3 rounded-xl shadow-md',
            isUser
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-card text-card-foreground border'
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </motion.div>

        {time && (
          <div
            className={cn(
              'text-xs text-muted-foreground mt-1 px-1',
              isUser ? 'text-right' : 'text-left'
            )}
          >
            {time}
          </div>
        )}
      </div>
    </motion.div>
  );
}
