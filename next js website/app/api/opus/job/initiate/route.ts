import { NextRequest, NextResponse } from 'next/server';

const OPUS_API_BASE = 'https://operator.opus.com';
const SERVICE_KEY = process.env.NEXT_PUBLIC_OPUS_SERVICE_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('🔑 Service Key (first 20 chars):', SERVICE_KEY.substring(0, 20) + '...');
    console.log('📤 Request body:', JSON.stringify(body));
    console.log('🌐 API URL:', `${OPUS_API_BASE}/job/initiate`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${OPUS_API_BASE}/job/initiate`, {
      method: 'POST',
      headers: {
        'x-service-key': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      return NextResponse.json(
        { error: `Failed to initiate job: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Success response:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('❌ Error initiating job:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error cause:', error.cause);
    
    return NextResponse.json(
      { 
        error: 'Failed to initiate job', 
        message: error.message,
        name: error.name,
        cause: error.cause?.message || 'Unknown cause'
      },
      { status: 500 }
    );
  }
}

