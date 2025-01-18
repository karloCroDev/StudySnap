// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import { GetNotesByUserId } from '@/database/pool';

// Models
import { UserClass } from '@/models/user';

const secret = process.env.NEXTAUTH_SECRET;

// Luka:
// This works that when you click on the user inside the note that you can see all his public notes, and this page is also for own public profile
// I need this for every user, and to only display the public notes of them. I hope this is not too complicated to make (intead of me fetching on frontend and then filtering)
// It would be nice if you can make it get with params instead of post request
// Btw I also need  username and profile picture in api when I get data from the user

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
    // Luka:

    // Make this PATCH request, because we don't upadate everything, and if resaurce is missing e.g. password it's getting updated?
    // Email is not needed
    const { username, email, password, profile_picture, userId } =
      await req.json();

    // Chnaged with and cloases (&&) instead of inital ors(||), and set status to 400 (Feel free to remove this, because I also check this on frontend)
    // See how to upload first then send image

    if (!username && !password && !email && !userId && profile_picture) {
      return NextResponse.json('Insufficient data provided', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // You need to make this fields optional, User don't want to update all fields, (I need to update only one or two fields ussually ).
    await UserClass.Update(
      username,
      email,
      hashedPassword,
      profile_picture, // Chnages this to camel case
      userId
    );

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
