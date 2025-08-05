'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MessageSquare, 
  FileText, 
  History, 
  Building2,
  ChevronDown,
  Settings
} from 'lucide-react';
import { config } from '@/config/config';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SidebarProps {
  selectedCompany: string;
  onCompanyChange: (companyId: string) => void;
}

const navigation = [
  { name: 'Chat', href: '/', icon: MessageSquare },
  { name: 'Documentation', href: '/docs', icon: FileText },
  { name: 'Changelog', href: '/changelog', icon: History },
];

export function Sidebar({ selectedCompany, onCompanyChange }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.div 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-70 bg-card border-r flex flex-col h-full"
    >
      {/* Logo and Title */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <div>
            <h1 className="font-bold text-sm">Task Systems</h1>
            <p className="text-xs text-muted-foreground">Agent Portal</p>
          </div>
        </div>
      </div>

      {/* Company Selector */}
      <div className="p-4 border-b">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          COMPANY
        </label>
        <Select value={selectedCompany} onValueChange={onCompanyChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {config.companies.find(c => c.id === selectedCompany)?.logo}
                </span>
                <span className="text-sm">
                  {config.companies.find(c => c.id === selectedCompany)?.name}
                </span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {config.companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{company.logo}</span>
                  <span>{company.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      isActive && "bg-primary/10 text-primary border border-primary/20"
                    )}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <p>Version {config.app.version}</p>
          <p className="mt-1">© 2025 Task Systems</p>
        </div>
      </div>
    </motion.div>
  );
}