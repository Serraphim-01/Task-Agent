import { config } from '@/config/config';

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export interface ApiRequest {
  query: string;
  sessionId?: string;
  companyId?: string;
}

export interface ApiResponse {
  reply: string;
  suggestions?: string[];
  status?: 'success' | 'error';
}

export class TaskAgentAPI {
  private static instance: TaskAgentAPI;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  static getInstance(): TaskAgentAPI {
    if (!TaskAgentAPI.instance) {
      TaskAgentAPI.instance = new TaskAgentAPI();
    }
    return TaskAgentAPI.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async sendMessage(query: string, companyId?: string): Promise<ApiResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          sessionId: this.sessionId,
          companyId,
          timestamp: new Date().toISOString()
        } as ApiRequest),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (typeof data === 'string') {
        return { reply: data, status: 'success' };
      }
      
      if (data.reply) {
        return { ...data, status: 'success' };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.');
        }
        throw error;
      }
      
      throw new Error('Something went wrong. Please try again.');
    }
  }

  getSessionId(): string {
    return this.sessionId;
  }

  resetSession(): void {
    this.sessionId = this.generateSessionId();
  }
}

export const taskAgentAPI = TaskAgentAPI.getInstance();