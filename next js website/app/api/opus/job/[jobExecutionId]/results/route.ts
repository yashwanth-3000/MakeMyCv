import { NextRequest, NextResponse } from 'next/server';

const OPUS_API_BASE = 'https://operator.opus.com';
const SERVICE_KEY = process.env.NEXT_PUBLIC_OPUS_SERVICE_KEY || '';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobExecutionId: string }> }
) {
  try {
    const { jobExecutionId } = await params;

    const response = await fetch(`${OPUS_API_BASE}/job/${jobExecutionId}/results`, {
      method: 'GET',
      headers: {
        'x-service-key': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to get job results: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error getting job results:', error);
    return NextResponse.json(
      { error: 'Failed to get job results', message: error.message },
      { status: 500 }
    );
  }
}

