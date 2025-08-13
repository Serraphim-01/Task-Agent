import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const n8nUrl = process.env.N8N_URL;

  if (!n8nUrl) {
    return NextResponse.json(
      { error: 'n8n webhook URL is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const n8nResponse = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your n8n webhook requires, e.g., an API key.
        // 'X-N8N-API-KEY': process.env.N8N_API_KEY
      },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('n8n API Error:', errorText);
      return NextResponse.json(
        { error: `n8n webhook error: ${n8nResponse.statusText}` },
        { status: n8nResponse.status }
      );
    }

    const data = await n8nResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json(
      { error: 'Failed to proxy request to n8n.', details: errorMessage },
      { status: 500 }
    );
  }
}
