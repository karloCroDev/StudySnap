// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models
import { GetPublicNotes } from '@/database/pool';

const secret = process.env.NEXTAUTH_SECRET;



export async function POST(req: NextRequest) {
    try {
        let notes = await GetPublicNotes(20);
        if (!notes) {
            return NextResponse.json('Notes not found', { status: 400 });
        }
        console.log(notes)
        return NextResponse.json(notes, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to get notes', { status: 500 });
    }
}