import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { deleteTarget } from '@/app/lib/api';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteTarget(Number(id));
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete target:', error);
    return NextResponse.json(
      { error: 'Failed to delete target' },
      { status: 500 }
    );
  }
}