// External packages
import { NextResponse, NextRequest } from 'next/server';

// Lib
import { GetNoteById } from '@/db/core/home/noteEditor';

// Models
import { Note } from '@/models/note';

//Function gets the note
export async function POST(req: NextRequest) {
  try {
    const { noteId, userId } = await req.json();

    if (!noteId) {
      return NextResponse.json({
        status: 400,
        statusText: 'Missing required fields',
      });
    }

    const note: Note = await GetNoteById(noteId, userId);

    return NextResponse.json(note, {
      status: 201,
      statusText: 'Created successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      statusText: 'Failed to create note',
    });
  }
}
