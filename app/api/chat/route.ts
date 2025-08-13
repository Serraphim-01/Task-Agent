export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const n8nBaseUrl = process.env.N8N_URL;

  if (!n8nBaseUrl) {
    return NextResponse.json(
      { error: "n8n webhook URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Extract known query params
    const { query, companyId, sessionId, ...restBody } = body;

    // Build query string
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ query, companyId, sessionId }).filter(
          ([, v]) => v !== undefined && v !== null
        )
      )
    ).toString();

    const n8nUrl = `${n8nBaseUrl}${qs ? `?${qs}` : ""}`;

    // Before sending to n8n
    console.log("=== Outgoing request to n8n webhook ===");
    console.log("Webhook URL:", n8nUrl);
    console.log("Query params:", { query, companyId, sessionId });
    console.log("Request body:", restBody);
    console.log(
      "Full request payload (stringified):",
      JSON.stringify(restBody, null, 2)
    );

    const n8nResponse = await fetch(n8nUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restBody),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error("n8n API Error:", errorText);
      return NextResponse.json(
        { error: `n8n webhook error: ${n8nResponse.statusText}` },
        { status: n8nResponse.status }
      );
    }

    const data = await n8nResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request to n8n.", details: String(error) },
      { status: 500 }
    );
  }
}
