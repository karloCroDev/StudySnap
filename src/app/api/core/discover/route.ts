// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { GetPublicNotes, GetRandomNotes } from '@/db/core/discover';
import { Note } from '@/models/note';

//Function that gets all of the notes that are avalible to the public

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const filter = searchParams.get('filter') ?? '';
    const offset = Number(searchParams.get('offset')) || 0;
    const limit = Number(searchParams.get('limit')) || 16;

    let notes: Note[];

    if (!userId) {
      return NextResponse.json(
        {
          message: 'Please enter the valid ID!',
        },
        {
          status: 400,
        }
      );
    }
    if (!filter) notes = await GetRandomNotes(limit, userId);
    else notes = await GetPublicNotes(limit, offset, userId, filter ?? '');

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
