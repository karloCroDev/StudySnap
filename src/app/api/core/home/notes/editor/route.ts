// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import { GetNoteById } from '@/db/core/home/noteEditor';
import { WriteImage } from '@/db/imageHandler';

// Models
import { Note } from '@/models/note';
import { SQLSyntaxCheck } from '@/lib/algorithms/stringVerification';

//Function gets the note
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get('noteId');
    const userId = searchParams.get('userId') || '0';

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

//Function that writes the image
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get('file');

  if (!image) {
    return NextResponse.json(
      {
        message: `Failed to get note`,
      },
      {
        status: 500,
      }
    );
  }
  const imagePath = await WriteImage(image, false);

  return NextResponse.json(imagePath, {
    status: 201,
  });
}
