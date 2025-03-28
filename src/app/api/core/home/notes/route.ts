// External packages
import { NextResponse, NextRequest } from 'next/server';

// Lib
import { WriteImage } from '@/db/imageHandler';
import { GetNoteById, GetNotesBySubjectId } from '@/db/core/home/note';

// Models
import { NoteClass } from '@/models/note';
import { SQLSyntaxCheck } from '@/db/algorithms/stringVerification';

// Luka: I removed the filters because it is better to implement client search instead of server search on note pages *There is not many of them, while on discover page I am going to optmise it for server search*

//Function gets all of the notes under a subject
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');
    const filter = searchParams.get('filter');

    // Luka: This is a potential SQL injection vulnerability (I am getting error of bad request) on almost all request here, please investigate what is wrong with it.

    // if (!SQLSyntaxCheck([subjectId, filter])) {
    //   return NextResponse.json({ status: 400, statusText: 'Bad request' });
    // }
    const notes = await GetNotesBySubjectId(subjectId as string);

    if (!notes) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
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

    if (
      !noteName ||
      isPublic == undefined ||
      !subjectId

      // ||
      // !SQLSyntaxCheck([subjectId, noteName, details])
    ) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
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
    const { noteId, imageUrl } = await req.json();
    if (!noteId) {
      return NextResponse.json({
        status: 400,
        statusText: 'Missing required fields',
      });
    }
    await NoteClass.Delete(noteId, imageUrl);
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

    if (!noteId || SQLSyntaxCheck([noteName, details, noteId, content])) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
    }

    const updates: { [key: string]: any } = {};
    if (noteName) updates.title = noteName;
    if (details) updates.details = details;
    if (content) updates.content = content;
    if (image) updates.image_url = await WriteImage(image);

    if (isPublic != null) updates.is_Public = isPublic === 'true' ? 1 : 0;

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
