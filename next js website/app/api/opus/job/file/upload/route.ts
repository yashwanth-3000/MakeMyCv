import { NextRequest, NextResponse } from 'next/server';

const OPUS_API_BASE = 'https://operator.opus.com';
const SERVICE_KEY = process.env.NEXT_PUBLIC_OPUS_SERVICE_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${OPUS_API_BASE}/job/file/upload`, {
      method: 'POST',
      headers: {
        'x-service-key': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to get presigned URL: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error getting presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to get presigned URL', message: error.message },
      { status: 500 }
    );
  }
}

