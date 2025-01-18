// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models
import { GetNotesBySubjectId } from '@/database/pool';
import { NoteClass } from '@/models/note';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');

    const notes = await GetNotesBySubjectId(subjectId as string);

    if (!notes) {
      return NextResponse.json('Notes not found', { status: 400 });
    }
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to get subjects', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { noteName, details, isPublic, subjectId } = await req.json();

    if (!noteName || isPublic == undefined || !subjectId) {
      return NextResponse.json('Missing required fields', { status: 400 });
    }

    await NoteClass.Insert(
      noteName,
      details ? details : '',
      isPublic,
      subjectId
    );

    // Luka:
    // I need to get noteId (and noteName,  details, isPublic) as a response, in order to create it on client (instead of refreshing the page)
    return NextResponse.json('Note created successfully', { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to create subject', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { noteId } = await req.json();
    if (!noteId) {
      return NextResponse.json('Missing required fields', { status: 400 });
    }
    await NoteClass.Delete(noteId);
    return NextResponse.json('Deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to delete', { status: 500 });
  }
}

// Luka:
//  This needs to be PATCH, because user doesn't update all the fileds (give them possiblity to update one field, two filed etc.)
export async function PUT(req: NextRequest) {
  try {
    const { noteName, details, isPublic, noteId } = await req.json();

    if (!noteName || isPublic == undefined || !noteId) {
      return NextResponse.json('Missing required fields', { status: 400 });
    }
    await NoteClass.Update(noteName, details, isPublic, noteId);

    return NextResponse.json('Note updated successfully', { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to update subject', { status: 500 });
  }
}
