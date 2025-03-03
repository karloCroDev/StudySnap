// External packages
import { NextResponse, NextRequest } from 'next/server';

// Lib
import { GetPublicNotes } from '@/lib/db/core/discover';

//Function that gets all of the notes that are avalible to the public
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    let notes = await GetPublicNotes(20, 0, userId);

    if (!notes) {
      return NextResponse.json({ status: 400, statusText: 'No notes found' });
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
