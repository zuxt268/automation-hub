import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getDomains } from '@/app/lib/api';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;
    const offset = searchParams.get('offset') ? Number(searchParams.get('offset')) : undefined;
    const status = searchParams.get('status') || undefined;
    const isJapan = searchParams.get('is_japan') ? searchParams.get('is_japan') === 'true' : undefined;
    const target = searchParams.get('target') || undefined;
    const name = searchParams.get('name') || undefined;

    const response = await getDomains({ limit, offset, status, is_japan: isJapan, target, name });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch domains:', error);
    return NextResponse.json(
      { error: 'Failed to fetch domains' },
      { status: 500 }
    );
  }
}