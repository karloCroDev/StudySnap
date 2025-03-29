// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { GetPublicNotes } from '@/db/core/discover';
import { SQLSyntaxCheck } from '@/lib/algorithms/stringVerification';

//Function that gets all of the notes that are avalible to the public
export async function POST(req: NextRequest) {
  try {
    const { userId, filter } = await req.json();

    let notes = await GetPublicNotes(200, 0, userId, filter ?? '');

    if (!notes || SQLSyntaxCheck([userId, filter])) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

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
