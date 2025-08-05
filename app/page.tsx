'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { ChatWindow } from '@/components/ChatWindow';
import { config } from '@/config/config';

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState(config.companies[0].id);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        selectedCompany={selectedCompany}
        onCompanyChange={setSelectedCompany}
      />
      
      <div className="flex-1 flex flex-col">
        <Navbar title="Task Agent Chat" />
        <ChatWindow selectedCompany={selectedCompany} />
      </div>
    </div>
  );
}