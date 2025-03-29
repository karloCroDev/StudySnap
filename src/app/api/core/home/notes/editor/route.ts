// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { GetNoteById } from '@/db/core/home/noteEditor';

// Models
import { Note } from '@/models/note';
import { SQLSyntaxCheck } from '@/db/algorithms/stringVerification';

//Function gets the note
export async function POST(req: NextRequest) {
  try {
    const { noteId, userId } = await req.json();

    if (!noteId || SQLSyntaxCheck([userId, noteId])) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

    const note: Note = await GetNoteById(noteId, userId);

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to create note' },
      { status: 400 }
    );
  }
}
