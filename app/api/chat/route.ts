export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const n8nUrl = process.env.N8N_URL;

  if (!n8nUrl) {
    console.error("❌ N8N_URL env var is missing");
    return NextResponse.json(
      { error: 'n8n webhook URL is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    console.log("📤 Sending to n8n:", JSON.stringify(body, null, 2));

    const n8nResponse = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const rawText = await n8nResponse.text();
    console.log("📥 Raw response from n8n:", rawText);

    if (!n8nResponse.ok) {
      return NextResponse.json(
        { error: `n8n webhook error: ${n8nResponse.statusText}`, raw: rawText },
        { status: n8nResponse.status }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      console.warn("⚠️ Response is not valid JSON, wrapping as text");
      parsed = { reply: rawText };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('❌ API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { error: 'Failed to proxy request to n8n.', details: errorMessage },
      { status: 500 }
    );
  }
}
