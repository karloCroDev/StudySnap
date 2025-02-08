// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Models
import { GetPublicNotes } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  // Luka:
  // Why does this need user.id I don't get it.   -- Because I need to see if the user liked the note
  // Provide me with userId for each note (author --> then his id) + it is under creator_id
  try {
    const { userId } = await req.json();

    let notes = await GetPublicNotes(20, 0, userId);
    if (!notes) {
      return NextResponse.json({ status: 400, statusText: 'No notes found' });
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to get notes' });
  }
}
