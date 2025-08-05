# Task Systems Agent Portal - Documentation

## Introduction

The **Task Systems Agent Portal** is a modern, conversational interface designed for partner companies and OEMs to interact with automated task systems through n8n workflows. This application provides a seamless chat experience for querying account information, managing subscriptions, monitoring API usage, and troubleshooting automation issues.

### Purpose

Our portal serves as the primary interface between your business needs and our automated systems, offering:

- **Instant Access**: Get immediate answers to account and subscription questions
- **Intelligent Automation**: Leverage n8n workflows for complex task management
- **Multi-Company Support**: Switch between different company contexts seamlessly
- **Real-time Communication**: Chat-based interface with typing indicators and instant responses

### Key Features

- 🤖 **AI-Powered Chat Interface** - Conversational interaction with automated agents
- 🏢 **Multi-Company Management** - Switch between different company accounts
- 📊 **Account Information** - Real-time access to subscription and usage data
- 🔧 **Automated Troubleshooting** - Intelligent problem diagnosis and solutions
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 📱 **Mobile Responsive** - Optimized experience across all devices
- ⚡ **Quick Actions** - Pre-defined queries for common tasks

## Getting Started

### How to Use the Chatbot

1. **Select Your Company**
   - Use the company selector in the sidebar to choose your organization
   - The agent will provide context-specific information based on your selection

2. **Start a Conversation**
   - Type your question in the chat input field at the bottom
   - Press Enter or click the Send button to submit your message

3. **Use Quick Actions**
   - Click on any of the quick action chips for common queries
   - These provide instant access to frequently requested information

4. **Review Responses**
   - The agent will respond with relevant information
   - Ask follow-up questions to dive deeper into specific topics

### Example Queries

Here are some example questions you can ask the agent:

- **Account Status**: "What is my current subscription status?"
- **Usage Monitoring**: "How many API calls have I used this month?"
- **Integration Help**: "What integrations are available for my account?"
- **Troubleshooting**: "Help me troubleshoot a failed automation"
- **Task History**: "Show me my recent task history"

### Quick Action Chips

The portal includes pre-configured quick action chips for common queries:

- What is my current subscription status?
- Show me my recent task history
- How many API calls have I used this month?
- What integrations are available?
- Help me troubleshoot a failed automation

## For Developers

### Project Structure

```
task-systems-portal/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main chat interface
│   ├── docs/page.tsx      # Documentation page
│   └── changelog/page.tsx # Version history
├── components/            # React components
│   ├── ChatWindow.tsx     # Main chat container
│   ├── ChatBubble.tsx     # Individual message bubbles
│   ├── TypingIndicator.tsx # Loading animation
│   ├── QuickActionChips.tsx # Quick action buttons
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Navbar.tsx         # Top navigation
│   └── theme-provider.tsx # Theme management
├── lib/                   # Utility libraries
│   ├── api.ts            # n8n API integration
│   └── utils.ts          # Common utilities
├── config/                # Configuration files
│   └── config.ts         # App configuration
└── styles/               # Global styles
    └── globals.css       # Tailwind CSS imports
```

### Design System Reference

#### Colors
- **Primary**: #2563EB (blue-600) - Main brand color
- **Secondary**: #9333EA (purple-600) - Accent color
- **Success**: #22C55E (green-500) - Success states
- **Neutral**: Grayscale palette from #F9FAFB to #111827

#### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Inter Bold (font-bold)
- **Body Text**: Inter Regular (font-normal)
- **Font Sizes**: xl for headlines, base for body, sm for secondary

#### Spacing
- **System**: 4-point spacing system (4px base unit)
- **Components**: Consistent padding and margins using Tailwind classes

#### Components
- **Border Radius**: rounded-xl for primary components
- **Shadows**: shadow-md to shadow-xl for elevation
- **Animations**: Framer Motion for smooth transitions

### Environment Configuration

Configure the n8n integration by setting the following environment variable:

```bash
NEXT_PUBLIC_N8N_URL=https://your-n8n-instance.com/webhook/task-agent
```

**Note**: This must be a publicly accessible URL that your Next.js application can reach.

### Development Setup

#### Prerequisites
- Node.js 18+ and npm/yarn
- Git for version control

#### Local Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd task-systems-portal
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your n8n URL
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

#### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### API Integration

The application integrates with n8n through a simple webhook interface:

#### Request Format
```typescript
{
  "query": "What is my current subscription status?",
  "sessionId": "session_1234567890_abc123",
  "companyId": "acme",
  "timestamp": "2025-01-04T10:30:00Z"
}
```

#### Response Format
```typescript
{
  "reply": "Your subscription is active until December 31, 2025.",
  "suggestions": ["View billing details", "Upgrade plan"],
  "status": "success"
}
```

### Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Automatic retry with exponential backoff
- **Timeout Handling**: 15-second timeout with user notification
- **Validation Errors**: Client-side validation with helpful messages
- **API Errors**: Graceful degradation with fallback responses

## Future Enhancements

### Version 1.1.0 (Planned)
- **User Authentication**: Role-based access control
- **File Upload**: Document sharing capabilities
- **Enhanced Analytics**: Detailed usage dashboard
- **Conversation History**: Persistent chat history

### Version 1.2.0 (Planned)
- **Custom Integrations**: User-defined workflow templates
- **Multi-language Support**: Internationalization
- **Advanced Search**: Full-text search across conversations
- **Export Features**: Download conversation transcripts

### Version 2.0.0 (Future)
- **Real-time Collaboration**: Multi-user chat sessions
- **Workflow Designer**: Visual automation builder
- **Enterprise SSO**: Single sign-on integration
- **Custom Branding**: White-label options

## Support

For technical support or questions about the Task Systems Agent Portal:

1. **Documentation**: Review this documentation and the changelog
2. **Chat Interface**: Use the portal itself to ask questions
3. **Developer Support**: Contact the development team for technical issues

## License

This project is proprietary software. All rights reserved.

---

*Last updated: January 4, 2025*
*Version: 1.0.0*