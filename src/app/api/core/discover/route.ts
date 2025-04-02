// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { GetPublicNotes, GetRandomNotes } from '@/db/core/discover';
import { Note } from '@/models/note';

//Function that gets all of the notes that are avalible to the public
export async function POST(req: NextRequest) {
  try {
    const { userId, filter, offset = 0, limit = 16 } = await req.json();
    
    let notes: Note[]

    if (!filter || filter == "") notes = await GetRandomNotes(limit, userId) 
    else notes =  await GetPublicNotes(limit, offset, userId, filter ?? '');

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
