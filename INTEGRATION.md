# Integration Requirements - Frontend ↔ n8n

This document outlines the integration requirements between the Task Systems Agent Portal frontend and the n8n automation backend.

## Overview

The frontend application communicates with n8n through a webhook-based API that processes user queries and returns automated responses. The integration is designed to be simple, reliable, and scalable.

## Frontend Requirements

### Environment Configuration

The frontend requires a single environment variable to configure the n8n integration:

```bash
NEXT_PUBLIC_N8N_URL=https://your-n8n-instance.com/webhook/task-agent
```

**Important Notes:**
- This URL must be publicly accessible from the client browser
- Use HTTPS in production for security
- The webhook endpoint should be configured in your n8n workflow

### Request Implementation

The frontend sends POST requests to the configured n8n webhook with the following characteristics:

- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Timeout**: 15 seconds
- **Error Handling**: Automatic retry with exponential backoff

## API Specification

### Request Format

The frontend sends requests in the following JSON format:

```typescript
interface ApiRequest {
  query: string;        // User's message/question
  sessionId: string;    // Unique session identifier
  companyId?: string;   // Selected company context
  timestamp: string;    // ISO 8601 timestamp
}
```

**Example Request:**
```json
{
  "query": "What is my current subscription status?",
  "sessionId": "session_1704362400_abc123def",
  "companyId": "acme",
  "timestamp": "2025-01-04T10:30:00.000Z"
}
```

#### Field Descriptions

- **query** (required): The user's natural language question or command
- **sessionId** (required): Auto-generated unique identifier for conversation continuity
- **companyId** (optional): Selected company context from the sidebar
- **timestamp** (required): Request timestamp for logging and analytics

### Response Format

The n8n webhook should respond with JSON in one of the following formats:

#### Standard Response
```typescript
interface ApiResponse {
  reply: string;           // Agent's response message
  suggestions?: string[];  // Optional quick action suggestions
  status?: 'success' | 'error';
}
```

**Example Response:**
```json
{
  "reply": "Your subscription is active until December 31, 2025. You have used 1,250 out of 10,000 API calls this month.",
  "suggestions": [
    "View detailed billing information",
    "Upgrade to premium plan",
    "Download usage report"
  ],
  "status": "success"
}
```

#### Simple String Response
For backward compatibility, the webhook can also return a simple string:

```json
"Your subscription is active until December 31, 2025."
```

The frontend will automatically wrap this in a standard response format.

## Expected Behaviors

### Success Scenarios

1. **Standard Query Response**
   - Frontend sends user query to n8n webhook
   - n8n processes the request and returns a response
   - Frontend displays the response in an agent message bubble
   - Optional suggestions are shown as quick action chips

2. **Company Context**
   - When a company is selected, the `companyId` is included in requests
   - n8n can use this to provide company-specific information
   - Responses should be tailored to the selected company context

### Error Scenarios

1. **Network Errors**
   - **Behavior**: Show error toast with retry option
   - **Message**: "Network error occurred. Please check your connection and try again."

2. **Timeout (>15 seconds)**
   - **Behavior**: Abort request and show timeout message
   - **Message**: "Request timed out. Please try again."

3. **HTTP Error Status**
   - **Behavior**: Show generic error message
   - **Message**: "Something went wrong. Please try again."

4. **Invalid Response Format**
   - **Behavior**: Show parsing error message
   - **Message**: "Received invalid response from server."

### Session Management

- **Session ID Generation**: Automatic generation using timestamp and random string
- **Session Persistence**: Maintained throughout the browser session
- **Session Reset**: New session created on page refresh or manual reset

## n8n Webhook Configuration

### Recommended n8n Workflow Structure

1. **Webhook Node**
   - Method: POST
   - Path: `/webhook/task-agent`
   - Response Mode: Using 'Respond to Webhook' node

2. **Input Processing**
   - Extract `query`, `sessionId`, `companyId` from request body
   - Validate required fields
   - Parse and understand user intent

3. **Business Logic**
   - Route to appropriate sub-workflows based on query type
   - Query external systems (databases, APIs, etc.)
   - Apply company-specific business rules

4. **Response Formatting**
   - Format response in the expected JSON structure
   - Include helpful suggestions when appropriate
   - Ensure response is within reasonable length limits

### Error Handling in n8n

The n8n workflow should handle errors gracefully:

```javascript
// Example n8n error handling
try {
  // Process user query
  const result = await processQuery(query, companyId);
  
  return {
    reply: result.message,
    suggestions: result.suggestions,
    status: 'success'
  };
} catch (error) {
  return {
    reply: "I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.",
    status: 'error'
  };
}
```

## Security Considerations

### Authentication (Future Enhancement)

Currently, the integration relies on the public nature of the webhook. Future versions may include:

- API key authentication
- JWT token validation
- IP whitelist restrictions

### Data Privacy

- No sensitive data should be logged in plain text
- Session IDs should not contain personally identifiable information
- Company data should be properly isolated

### Rate Limiting

Consider implementing rate limiting in n8n to prevent abuse:

- Maximum requests per session per minute
- Overall webhook rate limits
- Graceful degradation under high load

## Optional Future Enhancements

### Enhanced Request Format

Future versions may include additional fields:

```typescript
interface EnhancedApiRequest extends ApiRequest {
  userId?: string;      // Authenticated user identifier
  language?: string;    // Preferred response language
  context?: object;     // Additional conversation context
  metadata?: object;    // Custom metadata fields
}
```

### Structured Response Format

Enhanced responses with rich content:

```typescript
interface EnhancedApiResponse extends ApiResponse {
  type?: 'text' | 'table' | 'chart' | 'form';
  data?: object;        // Structured data for rich responses
  actions?: Action[];   // Interactive actions
  followUp?: string[];  // Suggested follow-up questions
}
```

### Streaming Responses

For long responses, consider implementing streaming:

- Server-Sent Events (SSE) for real-time updates
- Chunked response delivery
- Progressive message building in the UI

### WebSocket Integration

Real-time bidirectional communication:

- Instant message delivery
- Typing indicators from the backend
- Real-time status updates

## Testing and Validation

### Frontend Testing

Test the integration with various scenarios:

1. **Valid Responses**: Ensure proper parsing and display
2. **Error Conditions**: Verify error handling and user feedback
3. **Timeout Scenarios**: Test timeout behavior and recovery
4. **Network Issues**: Simulate network failures and reconnection

### Backend Testing

Validate the n8n webhook:

1. **Request Processing**: Verify all request fields are properly handled
2. **Response Format**: Ensure responses match the expected schema
3. **Error Handling**: Test various error conditions and responses
4. **Performance**: Measure response times under different loads

### End-to-End Testing

Complete integration testing:

1. **Happy Path**: Full conversation flow from frontend to backend
2. **Error Recovery**: Test error conditions and recovery mechanisms
3. **Session Continuity**: Verify session management across requests
4. **Company Context**: Test company-specific behavior

## Deployment Checklist

Before deploying the integration:

- [ ] n8n webhook URL is configured and accessible
- [ ] Environment variables are set correctly
- [ ] HTTPS is enabled for production
- [ ] Error handling is tested and working
- [ ] Response times are within acceptable limits
- [ ] Logging is configured for debugging
- [ ] Rate limiting is implemented if needed
- [ ] Security measures are in place

---

*Last updated: January 4, 2025*
*Version: 1.0.0*