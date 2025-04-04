// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { WriteImage } from '@/db/imageHandler';
import { GetNoteById, GetNotesBySubjectId } from '@/db/core/home/note';

// Models
import { NoteClass } from '@/models/note';
import { SQLSyntaxCheck } from '@/lib/algorithms/stringVerification';

// Gets all of the notes under a subject
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');

    const notes = await GetNotesBySubjectId(subjectId as string);

    if (!notes) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }
    return NextResponse.json(notes, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error occoured' }, { status: 500 });
  }
}

// Creating a new note and retrieving the info on frontend
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
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
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
      return NextResponse.json(
        { message: 'Failed to get id from inserted note' },
        {
          status: 500,
        }
      );
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

// Updates the note details
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
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

    const updates: { [key: string]: any } = {};
    if (noteName) updates.title = noteName;
    if (details) updates.details = details;
    if (content) updates.content = content;
    if (image) updates.image_url = await WriteImage(image);

    if (isPublic != null) updates.is_Public = isPublic === 'true' ? 1 : 0;

    await NoteClass.Update(noteId, updates);

    return NextResponse.json(
      { message: 'Note updated successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to update note' },
      { status: 500 }
    );
  }
}

// Deleting the note from the database
export async function DELETE(req: NextRequest) {
  try {
    const { noteId, imageUrl } = await req.json();
    if (!noteId) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
        },
        {
          status: 400,
        }
      );
    }
    await NoteClass.Delete(noteId, imageUrl);
    return NextResponse.json(
      { message: 'Deleted successfully' },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 });
  }
}
