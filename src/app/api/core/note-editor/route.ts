// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Models
import { Dokument } from '@/models/document';
import { GetDocumentsByNoteId, GetNoteNameById } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
    try {

        const { noteId } = await req.json();

        if (!noteId) {
            return NextResponse.json('Note ID is required', { status: 400 });
        }

        let doc: Dokument = await GetDocumentsByNoteId(noteId)

        if (!doc) {
            let title = await GetNoteNameById(noteId);

            doc = new Dokument(title, "", noteId);
            await doc.Insert();
        }

        return NextResponse.json(doc, { status: 200 });

    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    console.log("Wrong addreess")
    try {
        const { title, content, id } = await req.json();


        if (!title || !id) {
            return NextResponse.json('Title, content, noteId, and id are required', { status: 400 });
        }
        const token = await getToken({ req, secret });

        if (!token) {
            return NextResponse.json('Unauthorized', { status: 401 });
        }

        
        await Dokument.Update(title, content, id);

        return NextResponse.json('Saved', { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to save', { status: 500 });
    }
}