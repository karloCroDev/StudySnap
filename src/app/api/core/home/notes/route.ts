// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models
import { Note } from '@/models/note';
import { GetNotesBySubjectId } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const subjectId = searchParams.get('subjectId');

        const notes = await GetNotesBySubjectId(subjectId as string);
        if (!notes) {
            return NextResponse.json('Notes not found', { status: 404 });
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

        const note = new Note(noteName, details ? details : "",isPublic,  subjectId);
        await note.Insert();
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

        await Note.Delete(noteId);
        return NextResponse.json('Deleted successfully', { status: 200 });
    
    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to delete', { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {

        const { noteName, details, isPublic, noteId } = await req.json();

        if (!noteName || isPublic == undefined || !noteId) {
            return NextResponse.json('Missing required fields', { status: 400 });
        }
        await Note.Update(noteName, details, isPublic, noteId);

        return NextResponse.json('Note updated successfully', { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to update subject', { status: 500 });
    }
}