// External packages
import { NextResponse, NextRequest } from 'next/server';

// Lib
import { WriteImage } from '@/lib/db/imageHandler';
import { GetNoteById, GetNotesBySubjectId } from '@/lib/db/core/home/note';

// Models
import { NoteClass } from '@/models/note';

//Function gets all of the notes under a subject
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');

    const notes = await GetNotesBySubjectId(subjectId as string);

    if (!notes) {
      return NextResponse.json({ status: 400, statusText: 'No notes found' });
    }
    return NextResponse.json(notes, {
      status: 200,
      statusText: 'Note successfully created',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Error occoured' });
  }
}

//Function creates a new note
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const subjectId = formData.get('subjectId') as string;
    const noteName = formData.get('noteName') as string;
    const details = formData.get('details') as string | null;
    const isPublic = formData.get('isPublic') == 'true';
    const file = formData.get('file');

    if (!noteName || isPublic == undefined || !subjectId) {
      return NextResponse.json({
        status: 400,
        statusText: 'Missing required fields',
      });
    }

    const imagePath = await WriteImage(file);
    const id = await NoteClass.Insert(
      noteName,
      details ? details : '',
      isPublic,
      subjectId,
      imagePath
    );

    if (!id) {
      console.error('Failed to get id from inserted note');
      return NextResponse.json({
        status: 500,
        statusText: 'Failed to get id from inserted note',
      });
    }

    const note = await GetNoteById(id, '0');

    return NextResponse.json(note, {
      status: 201,
      statusText: `You have succesfully updated ${note.title}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      statusText: 'Failed to create note',
    });
  }
}

//Function deletes note
export async function DELETE(req: NextRequest) {
  try {
    const { noteId } = await req.json();
    if (!noteId) {
      return NextResponse.json({
        status: 400,
        statusText: 'Missing required fields',
      });
    }
    await NoteClass.Delete(noteId);
    return NextResponse.json({
      status: 200,
      statusText: 'Deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to delete' });
  }
}

//Function updates the notes
export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();

    const noteName = formData.get('noteName') as string;
    const details = formData.get('details') as string | null;
    const isPublic = formData.get('isPublic') as string;
    const noteId = formData.get('noteId') as string;
    const content = formData.get('content') as string;
    const image = formData.get('file');

    if (!noteId) {
      return NextResponse.json({
        status: 400,
        statusText: 'Note Id is requiered',
      });
    }
    console.log(isPublic);
    const updates: { [key: string]: any } = {};
    if (noteName) updates.title = noteName;
    if (details) updates.details = details;
    if (content) updates.content = content;
    if (image) updates.image_url = await WriteImage(image);
    console.log(isPublic);
    if (isPublic != null) updates.is_Public = isPublic === 'true' ? 1 : 0;

    console.log(updates);
    await NoteClass.Update(noteId, updates);

    return NextResponse.json({
      status: 201,
      statusText: 'Note updated successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      statusText: 'Failed to update note',
    });
  }
}
