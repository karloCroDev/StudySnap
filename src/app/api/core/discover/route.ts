// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { GetPublicNotes } from '@/db/core/discover';
import { SQLSyntaxCheck } from '@/lib/algorithms/stringVerification';

//Function that gets all of the notes that are avalible to the public
export async function POST(req: NextRequest) {
  try {
    const { userId, filter, offset = 0, limit = 4 } = await req.json();

    let notes = await GetPublicNotes(limit, offset, userId, filter ?? '');

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to get notes',
      },
      {
        status: 500,
      }
    );
  }
}
