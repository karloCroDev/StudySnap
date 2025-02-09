// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models
import { GetNoteById, GetNotesBySubjectId } from '@/database/pool';
import { Note, NoteClass } from '@/models/note';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { noteId, userId } = await req.json();

    if (!noteId) {
      return NextResponse.json( { status: 400, statusText: 'Missing required fields'});
    }

    const note: Note = await GetNoteById(noteId, userId)

    return NextResponse.json(note, {
      status: 201,
      statusText: 'Created successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to create note'});
  }
}
