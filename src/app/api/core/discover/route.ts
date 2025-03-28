// External packages
import { NextResponse, NextRequest } from 'next/server';

// Lib
import { GetPublicNotes } from '@/db/core/discover';
import { SQLSyntaxCheck } from '@/db/algorithms/stringVerification';

//Function that gets all of the notes that are avalible to the public
export async function POST(req: NextRequest) {
  try {
    const { userId, filter } = await req.json();

    let notes = await GetPublicNotes(200, 0, userId, filter ?? '');

    if (!notes || SQLSyntaxCheck([userId, filter])) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
    }
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      statusText: 'Failed to get notes',
    });
  }
}
