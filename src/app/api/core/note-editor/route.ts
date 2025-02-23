// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Models
import { Dokument, DokumentClass } from '@/models/document';
import { GetDocumentsByNoteId, GetNoteNameById } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;

// Luka: Not mandatory, but GET with params, is maybe better
export async function POST(req: NextRequest) {
  try {
    const { noteId } = await req.json();

    if (!noteId) {
      return NextResponse.json({
        status: 400,
        statusText: 'Note ID is missing',
      });
    }

    // Luka: fix Added additional fields to the document
    let doc: Dokument = await GetDocumentsByNoteId(noteId);
    const additonalData = await GetNoteNameById(noteId);

    if (!doc) {
      let id = await DokumentClass.Insert(noteId, '');

      doc = {
        id: id!,
        title: additonalData.title,
        content: '',
        author: additonalData.author,
        note_id: noteId,
        creator_id: additonalData.creator_id,
        likes: additonalData.likes,
        liked: additonalData.liked,
      };
    } else {
      doc = {
        ...doc,
        title: additonalData.title,
        author: additonalData.author,
        creator_id: additonalData.creator_id,
        likes: additonalData.likes,
        liked: additonalData.liked,
      };
    }

    return NextResponse.json(doc, {
      status: 200,
      statusText: 'Created successfully',
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json({
      status: 500,
      statusText: 'Failed to create document',
    });
  }
}

// Luka: Change to PATCH, not mandatory because I can just pass title every time
export async function PUT(req: NextRequest) {
  try {
    const { content, id } = await req.json();

    if (!id) {
      return NextResponse.json('Title, content, noteId, and id are required', {
        status: 400,
      });
    }

    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ status: 401, statusText: 'Unauthorized' });
    }

    await DokumentClass.Update(content, id);

    return NextResponse.json({ status: 200, statusText: 'Saved' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to save' });
  }
}
