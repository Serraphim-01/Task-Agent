export const config = {
  app: {
    title: "Task Systems Agent Portal",
    description: "AI-powered task automation and support for partner companies",
    version: "1.0.0"
  },
  api: {
    n8nUrl: process.env.NEXT_PUBLIC_N8N_URL || "https://replace-with-your-n8n-instance.com/webhook/your-secret-path",
    timeout: 15000 // 15 seconds
  },
  colors: {
    primary: "#2563EB", // blue-600
    secondary: "#9333EA", // purple-600
    success: "#22C55E", // green-500
    neutral: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827"
    }
  },
  quickActions: [
    "What is my current subscription status?",
    "Show me my recent task history",
    "How many API calls have I used this month?",
    "What integrations are available?",
    "Help me troubleshoot a failed automation"
  ],
  companies: [
    { id: "acme", name: "Acme Corp", logo: "🏢" },
    { id: "techco", name: "TechCo Industries", logo: "⚡" },
    { id: "globalinc", name: "Global Inc", logo: "🌍" }
  ]
};