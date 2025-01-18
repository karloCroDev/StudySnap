// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Models
import { GetPublicNotes } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  // Luka:
  // Why does this need user.id I don't get it. Provide me with userId for each note (author --> then his id)
  try {
    const { userId } = await req.json();

    let notes = await GetPublicNotes(20, 0, userId);
    if (!notes) {
      return NextResponse.json('Notes not found', { status: 400 });
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to get notes', { status: 500 });
  }
}
