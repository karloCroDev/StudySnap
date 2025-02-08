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
      return NextResponse.json( { status: 400, statusText: 'Note ID is missing'});
    }

    let doc: Dokument = await GetDocumentsByNoteId(noteId);

    if (!doc) {
      let title = await GetNoteNameById(noteId);
      let id = await DokumentClass.Insert(title, '', noteId);
      doc = {
        id: id,
        title: title,
        content: '',
        note_id: noteId,
      } as Dokument;
    }

    return NextResponse.json(doc, { status: 200, statusText: "Created successfully"});
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json({ status: 500, statusText: 'Failed to create document'});
  }
}

// Luka: Change to PATCH, not mandatory because I can just pass title every time
export async function PUT(req: NextRequest) {
  try {
    const { title, content, id } = await req.json();

    if (!title || !id) {
      return NextResponse.json('Title, content, noteId, and id are required', {
        status: 400,
      });
    }
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ status: 401, statusText: 'Unauthorized'});
    }

    await DokumentClass.Update(title, content, id);

    return NextResponse.json( { status: 200, statusText: 'Saved'});
  } catch (error) {
    console.error(error);
    return NextResponse.json( { status: 500, statusText:'Failed to save' });
  }
}
