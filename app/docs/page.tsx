'use client';

import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { useState } from 'react';
import { config } from '@/config/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Code, Play, Settings, Zap } from 'lucide-react';

export default function DocsPage() {
  const [selectedCompany, setSelectedCompany] = useState(config.companies[0].id);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        selectedCompany={selectedCompany}
        onCompanyChange={setSelectedCompany}
      />
      
      <div className="flex-1 flex flex-col">
        <Navbar title="Documentation" />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <div>
              <h1 className="text-3xl font-bold mb-4">Documentation</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Complete guide to using the Task Systems Agent Portal
              </p>
            </div>

            {/* Purpose */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Task Systems Agent Portal provides a conversational interface for partner 
                  companies and OEMs to query account-related information through automated n8n workflows.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    <li>Real-time chat interface with AI-powered responses</li>
                    <li>Account status and subscription information</li>
                    <li>API usage monitoring and analytics</li>
                    <li>Automated troubleshooting assistance</li>
                    <li>Integration management and support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">How to Use the Chatbot:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                    <li>Select your company from the sidebar dropdown</li>
                    <li>Type your question in the chat input field</li>
                    <li>Use quick action chips for common queries</li>
                    <li>Review the agent's response and ask follow-up questions</li>
                  </ol>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Example Queries:</h4>
                  <div className="grid gap-2">
                    {config.quickActions.map((action, index) => (
                      <Badge key={index} variant="outline" className="justify-start">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* For Developers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  For Developers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Project Structure:</h4>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main chat interface
├── docs/page.tsx      # This documentation page
└── changelog/page.tsx # Version history

components/
├── ChatWindow.tsx     # Main chat container
├── ChatBubble.tsx     # Message bubble component
├── TypingIndicator.tsx # Loading animation
├── QuickActionChips.tsx # Quick action buttons
├── Sidebar.tsx        # Navigation sidebar
└── Navbar.tsx         # Top navigation bar

lib/
└── api.ts            # n8n integration helpers

config/
└── config.ts         # App configuration`}
                  </pre>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Environment Configuration:</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Set the following environment variable to configure n8n integration:
                  </p>
                  <pre className="bg-muted p-3 rounded-md text-sm">
                    <code>NEXT_PUBLIC_N8N_URL=https://your-n8n-instance.com/webhook/task-agent</code>
                  </pre>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Development Commands:</h4>
                  <div className="space-y-2">
                    <div>
                      <Badge variant="outline">Local Development</Badge>
                      <pre className="bg-muted p-3 rounded-md text-sm mt-2">
                        <code>npm install && npm run dev</code>
                      </pre>
                    </div>
                    <div>
                      <Badge variant="outline">Production Build</Badge>
                      <pre className="bg-muted p-3 rounded-md text-sm mt-2">
                        <code>npm run build</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Enhancements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Future Enhancements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Planned Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>User authentication and role-based access</li>
                      <li>File upload support for documents</li>
                      <li>Advanced analytics dashboard</li>
                      <li>Custom integration templates</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technical Improvements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Streaming responses for long replies</li>
                      <li>Offline mode with local caching</li>
                      <li>Multi-language support</li>
                      <li>Enhanced error recovery</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}