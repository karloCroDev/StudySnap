// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import { GetNotesByUserId, GetUserById } from '@/database/pool';

// Models
import { UserClass } from '@/models/user';

import { WriteImage } from '@/database/ImageHandler';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json('Insufficient data provided', { status: 200 });
    }

    let notes = await GetNotesByUserId(userId);
    let user = await GetUserById(userId)

    return NextResponse.json([notes, user], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to load notes', { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();

    const userId = formData.get('user.Id') as string
    const username = formData.get('username') as string | null ;
    const password = formData.get('password') as string | null;
    const file = formData.get('file');

    if (!userId) {
      return NextResponse.json('User ID is required', { status: 400 });
    }

    const updates: { [key: string]: any } = {};
    if (username) updates.username = username;
    if (password) updates.password = await bcrypt.hash(password, 10);
    if (file) updates.image = await WriteImage(file);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json('No fields to update', { status: 400 });
    }

    await UserClass.Update(userId, updates);

    return NextResponse.json('User updated successfully', { status: 200 });
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

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json('Missing required fields', { status: 400 });
    }

    await UserClass.Delete(userId);
    return NextResponse.json('Subject deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to delete subject', { status: 500 });
  }
}

