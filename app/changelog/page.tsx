'use client';

import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { useState } from 'react';
import { config } from '@/config/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Bug, RefreshCw } from 'lucide-react';

export default function ChangelogPage() {
  const [selectedCompany, setSelectedCompany] = useState(config.companies[0].id);

  const releases = [
    {
      version: '1.0.0',
      date: '2025-01-04',
      type: 'major',
      added: [
        'Initial release of Task Systems Agent Portal',
        'Chat interface with message bubbles, typing indicator, and quick actions',
        'Integration with n8n webhook for automated responses',
        'Sidebar navigation with company switcher',
        'Dark mode support with theme persistence',
        'Responsive design optimized for mobile and desktop',
        'Documentation and changelog pages',
        'Error handling with toast notifications',
        'Auto-scroll to latest messages',
        'Session management for continuous conversations'
      ],
      fixed: [],
      changed: []
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-500';
      case 'minor': return 'bg-blue-500';
      case 'patch': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'added': return <Plus className="h-4 w-4" />;
      case 'fixed': return <Bug className="h-4 w-4" />;
      case 'changed': return <RefreshCw className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        selectedCompany={selectedCompany}
        onCompanyChange={setSelectedCompany}
      />
      
      <div className="flex-1 flex flex-col">
        <Navbar title="Changelog" />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div>
              <h1 className="text-3xl font-bold mb-4">Changelog</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Track all changes and updates to the Task Systems Agent Portal
              </p>
            </div>

            <div className="space-y-6">
              {releases.map((release) => (
                <Card key={release.version}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(release.type)}`} />
                        Version {release.version}
                      </CardTitle>
                      <Badge variant="outline">
                        {release.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {release.added.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                          {getIcon('added')}
                          Added
                        </h4>
                        <ul className="space-y-2">
                          {release.added.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {release.fixed.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-red-600 dark:text-red-400 mb-3">
                          {getIcon('fixed')}
                          Fixed
                        </h4>
                        <ul className="space-y-2">
                          {release.fixed.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {release.changed.length > 0 && (
                      <div>
                        <h4 className="font-medium flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
                          {getIcon('changed')}
                          Changed
                        </h4>
                        <ul className="space-y-2">
                          {release.changed.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-dashed">
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  More updates coming soon. Follow our development progress for the latest features and improvements.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}