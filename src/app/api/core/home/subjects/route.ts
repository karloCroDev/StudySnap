// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models
import { Subject } from '@/models/subject';
import { GetSubjectByCreatorId } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        const subjects = await GetSubjectByCreatorId(userId as string);
        if (!subjects) {
            return NextResponse.json('Subjects not found', { status: 404 });
        }
        return NextResponse.json(subjects, { status: 200 });
    
    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to get subjects', { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Extract and verify the JWT
        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.json('Unauthorized', { status: 401 });
        }

        const { subjectName, details, image } = await req.json();
        const creator = token.uid;

        if (!subjectName|| !creator) {
            return NextResponse.json('Missing required fields', { status: 400 });
        }

        try{
            const subject = new Subject(subjectName, details ? details : "", creator.toString(), image ? image : "");
            await subject.Insert();
            return NextResponse.json('Subject created successfully', { status: 201 });
        }catch(e){
            console.error(e);
            return NextResponse.json('Failed to create subject', { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to create subject', { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Extract and verify the JWT
        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.json('Unauthorized', { status: 401 });
        }

        const { id } = await req.json();
        if (!id) {
            return NextResponse.json('Missing required fields', { status: 400 });
        }

        try {
            await Subject.Delete(id);
            return NextResponse.json('Subject deleted successfully', { status: 200 });
        } catch (e) {
            console.error(e);
            return NextResponse.json('Failed to delete subject', { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to delete subject', { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        // Extract and verify the JWT
        const token = await getToken({ req, secret });
        if (!token) {
            return NextResponse.json('Unauthorized', { status: 401 });
        }
        const { id, subjectName, details } = await req.json();
    
        if (!id || !subjectName) {
            return NextResponse.json('Missing required fields', { status: 400 });
        }

        try {
            await Subject.Update(id, subjectName, details);
            return NextResponse.json('Subject updated successfully', { status: 200 });
        } catch (e) {
            console.error(e);
            return NextResponse.json('Failed to update subject', { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to update subject', { status: 500 });
    }
}