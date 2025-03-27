// External packages
import { NextResponse, NextRequest } from 'next/server';

// Lib
import { GetNoteById } from '@/lib/db/core/home/noteEditor';

// Models
import { Note } from '@/models/note';
import { SQLSyntaxCheck } from '@/lib/db/algorithms/string verification';

//Function gets the note
export async function POST(req: NextRequest) {
  try {
    const { noteId, userId } = await req.json();

    if (!noteId|| SQLSyntaxCheck([userId, noteId])) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
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
