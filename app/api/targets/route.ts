import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { createTarget } from '@/app/lib/api';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const target = await createTarget(body);
    return NextResponse.json(target, { status: 201 });
  } catch (error) {
    console.error('Failed to create target:', error);
    return NextResponse.json(
      { error: 'Failed to create target' },
      { status: 500 }
    );
  }
}