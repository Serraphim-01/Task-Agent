'use client';

import { motion } from 'framer-motion';
import { config } from '@/config/config';
import { Button } from '@/components/ui/button';

interface QuickActionChipsProps {
  onActionClick: (action: string) => void;
  disabled?: boolean;
}

export function QuickActionChips({ onActionClick, disabled }: QuickActionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {config.quickActions.map((action, index) => (
        <motion.div
          key={action}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action)}
            disabled={disabled}
            className="text-xs h-8 px-3 hover:bg-primary/10 hover:border-primary/20 transition-colors"
          >
            {action}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}