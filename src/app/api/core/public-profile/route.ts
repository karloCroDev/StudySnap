// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import { GetNotesByUserId } from '@/database/pool';
// Models
import  {User, UserClass}  from '@/models/user';

const secret = process.env.NEXTAUTH_SECRET;


export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json('Insufficient data provided', { status: 200 });
    }

    let notes = await GetNotesByUserId(userId);

    return NextResponse.json(notes, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to load notes', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
      const { username, email, password, profile_picture, userId } = await req.json();

    if (!username || !password || !email || !userId) {
      return NextResponse.json('Insufficient data provided', { status: 200 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserClass.Update(username, email, hashedPassword, profile_picture, userId);

    return NextResponse.json('User updated', { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to update user', { status: 500 });
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

        await UserClass.Delete(id);
        return NextResponse.json('Subject deleted successfully', { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json('Failed to delete subject', { status: 500 });
    }
}