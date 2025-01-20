// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Models


import { LikeClass } from '@/models/like';

const secret = process.env.NEXTAUTH_SECRET;

//This request is responsible for liking and disliking notes

export async function POST(req: NextRequest) {
    try {

        const {noteId , userId, exists } = await req.json();

        if (!noteId || !userId) {
            return NextResponse.json('Missing required fields', { status: 400 });
        }
        if (exists) {
            await LikeClass.Delete(userId, noteId);
        }
        else{
            await LikeClass.Insert(userId, noteId);
        }
        return NextResponse.json('Success', { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to create subject', { status: 500 });
    }
}