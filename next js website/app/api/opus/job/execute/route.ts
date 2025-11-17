import { NextRequest, NextResponse } from 'next/server';

const OPUS_API_BASE = 'https://operator.opus.com';
const SERVICE_KEY = process.env.NEXT_PUBLIC_OPUS_SERVICE_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('🚀 Execute Job Request');
    console.log('📤 Job Execution ID:', body.jobExecutionId);
    console.log('📤 Payload Schema Instance:', JSON.stringify(body.jobPayloadSchemaInstance, null, 2));

    const response = await fetch(`${OPUS_API_BASE}/job/execute`, {
      method: 'POST',
      headers: {
        'x-service-key': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      return NextResponse.json(
        { error: `Failed to execute job: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Success response:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('❌ Error executing job:', error);
    return NextResponse.json(
      { error: 'Failed to execute job', message: error.message },
      { status: 500 }
    );
  }
}

