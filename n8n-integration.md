# n8n Integration Guide

This document provides instructions on how to integrate this application with your n8n instance. The integration allows the agent to send user queries to an n8n workflow and receive responses back in the chat window.

## Prerequisites

- A running n8n instance (cloud or self-hosted).
- Basic knowledge of creating n8n workflows.

## 1. Create an n8n Workflow

First, you need to create an n8n workflow that will process the user's queries.

1.  **Create a new workflow** in your n8n instance.
2.  **Add a "Webhook" node** as the trigger. This node will listen for incoming requests from the application.
3.  In the Webhook node settings:
    -   **HTTP Method**: Set to `POST`.
    -   **JSON Passthrough**: Enable this option to easily access the request body.
    -   **Path**: Give it a unique and secret path (e.g., `my-secret-task-agent`).

4.  **Copy the Webhook URL**. After you activate the workflow, n8n will provide a "Test URL" and a "Production URL". You will need the **Production URL** for the application configuration.

    ![n8n Webhook URL](https://i.imgur.com/your-image.png) <!-- It's recommended to replace this with an actual screenshot -->

5.  **Add your processing logic**. You can add any nodes you need to process the query. For example, you can use the "AI Agent" node, "If" nodes for routing, or any other n8n nodes to connect to your services.

6.  **Send a response back**. The workflow must send a response back to the application. The response should be a JSON object with a `reply` property.

    Here is an example of a simple workflow that uses an "AI Agent" to generate a response:

    ```json
    {
      "nodes": [
        {
          "parameters": {},
          "name": "Start",
          "type": "n8n-nodes-base.start",
          "typeVersion": 1,
          "position": [
            240,
            300
          ]
        },
        {
          "parameters": {
            "path": "my-secret-task-agent",
            "options": {}
          },
          "name": "Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1,
          "position": [
            460,
            300
          ],
          "webhookId": "your-webhook-id"
        },
        {
          "parameters": {
            "prompt": "You are a helpful assistant. The user said: {{ $json.body.query }}. The user is from company: {{ $json.body.companyId }}. The session ID is: {{ $json.body.sessionId }}. Respond to the user's query.",
            "options": {}
          },
          "name": "AI Agent",
          "type": "n8n-nodes-base.aiAgent",
          "typeVersion": 1,
          "position": [
            680,
            300
          ]
        },
        {
          "parameters": {
            "responseCode": 200,
            "options": {
              "responseBody": "={{ { \"reply\": $json.output } }}"
            }
          },
          "name": "Respond to Webhook",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [
            900,
            300
          ]
        }
      ],
      "connections": {
        "Start": {
          "main": [
            [
              {
                "node": "Webhook",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Webhook": {
          "main": [
            [
              {
                "node": "AI Agent",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "AI Agent": {
          "main": [
            [
              {
                "node": "Respond to Webhook",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      }
    }
    ```

## 2. Configure the Application

Once you have your n8n workflow and the Production Webhook URL, you need to configure the application to use it.

1.  **Create a `.env.local` file** in the root of the project if you don't have one already.
2.  **Add the `NEXT_PUBLIC_N8N_URL` environment variable** to the `.env.local` file with the URL you copied from n8n.

    ```
    NEXT_PUBLIC_N8N_URL=https://your-n8n-instance.com/webhook/your-secret-task-agent
    ```

3.  **Restart the application**. The application will now use your n8n workflow to handle user queries.

## Request Body Schema

The application sends a `POST` request to the n8n webhook with the following JSON body:

```json
{
  "query": "The user's message",
  "sessionId": "A unique session ID",
  "companyId": "The selected company ID (e.g., 'acme')",
  "timestamp": "The ISO 8601 timestamp of the message"
}
```

You can use this data in your n8n workflow to personalize the responses. For example, you can use the `companyId` to look up company-specific information in a database.

## Response Body Schema

The application expects the n8n workflow to respond with a JSON object containing at least a `reply` property.

```json
{
  "reply": "The agent's response to the user.",
  "suggestions": [
    "A list of suggested follow-up questions.",
    "These are optional."
  ]
}
```

The `suggestions` array is optional and can be used to provide quick action chips to the user.
