import { NextRequest, NextResponse } from 'next/server';

const OPUS_API_BASE = 'https://operator.opus.com';
const SERVICE_KEY = process.env.NEXT_PUBLIC_OPUS_SERVICE_KEY || '';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing Opus API connection...');
    console.log('🌐 Base URL:', OPUS_API_BASE);
    console.log('🔑 Service Key present:', !!SERVICE_KEY);
    console.log('🔑 Service Key length:', SERVICE_KEY.length);
    console.log('🔑 Service Key (first 20 chars):', SERVICE_KEY.substring(0, 20) + '...');

    // Try a simple workflow fetch to test connectivity
    const testWorkflowId = '5sLHcgw7N9gVv5lz';
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const startTime = Date.now();
    
    const response = await fetch(`${OPUS_API_BASE}/workflow/${testWorkflowId}`, {
      method: 'GET',
      headers: {
        'x-service-key': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log('⏱️  Response time:', responseTime, 'ms');
    console.log('📥 Response status:', response.status, response.statusText);

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        responseTime: `${responseTime}ms`,
        error: errorText,
        headers: responseHeaders,
        serviceKeyConfigured: !!SERVICE_KEY,
      });
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      status: response.status,
      statusText: response.statusText,
      responseTime: `${responseTime}ms`,
      workflowName: data.name || 'Unknown',
      headers: responseHeaders,
      serviceKeyConfigured: !!SERVICE_KEY,
      message: '✅ Connection successful!'
    });

  } catch (error: any) {
    console.error('❌ Connection test failed:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      errorName: error.name,
      errorCause: error.cause?.message || 'Unknown',
      serviceKeyConfigured: !!SERVICE_KEY,
      message: '❌ Connection failed!'
    }, { status: 500 });
  }
}

