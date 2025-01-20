// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models
import { GetNoteById, GetNotesBySubjectId } from '@/database/pool';
import { NoteClass, Note } from '@/models/note';

const secret = process.env.NEXTAUTH_SECRET;

//Change responses like this POST request 

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

    const id = await NoteClass.Insert(
      noteName,
      details ? details : '',
      isPublic,
      subjectId
    );

    if (!id) {
      console.error("Failed to get id from inserted note");
      return NextResponse.json('Failed to create note', { status: 500 });
    }

    const note = await GetNoteById(id)
    // Luka: +
    // I need to get noteId (and noteName,  details, isPublic) as a response , in order to create it on client (instead of refreshing the page)
    
    return NextResponse.json(note, { status: 201, statusText: "Created successfully"  });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to create note', { status: 500 });
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

// Luka: +
//  This needs to be PATCH, because user doesn't update all the fileds (give them possiblity to update one field, two field etc.)
export async function PATCH(req: NextRequest) {
  try {
    const { noteName, details, isPublic, noteId } = await req.json();

    if (!noteId) {
      return NextResponse.json({ status: 400, statusText: "Note Id is requiered" });
    }

    const updates: { [key: string]: any } = {};
    if (noteName) updates.title = noteName;
    if (details) updates.details = details;
    if (isPublic) updates.is_Public = isPublic? 1 : 0;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ status: 400, statusText: 'No fields to update', });
    }

    await NoteClass.Update(noteId, updates);

    return NextResponse.json({ status: 201, statusText: 'Note updated successfully', });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to update note', });
  }
}
