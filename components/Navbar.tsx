'use client';

import { motion } from 'framer-motion';
import { Activity, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <Badge variant="secondary" className="gap-1">
          <Activity size={12} />
          Connected
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </motion.header>
  );
}