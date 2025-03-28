// External packages
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

// Database
import {
  GetNotesByCreatorId,
  GetUserById,
  GetLikedNotes,
} from '@/db/core/publicProfile';
import { GetProfileImage, WriteImage } from '@/db/imageHandler';

// Models
import { UserClass } from '@/models/user';
import { SQLSyntaxCheck } from '@/lib/algorithms/stringVerification';

// Function to handle all liked posts from user
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('creatorId');

  if (!userId || SQLSyntaxCheck([userId])) {
    return NextResponse.json({ status: 400, statusText: 'Bad request' });
  }

  const likedNotes = await GetLikedNotes(userId);
  return NextResponse.json(likedNotes, {
    status: 201,
  });
}

// Function to handle POST requests for retrieving public profile data
export async function POST(req: NextRequest) {
  try {
    const { creatorId, userId } = await req.json();

    if (!creatorId || SQLSyntaxCheck([userId, creatorId])) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
    }

    let notes = await GetNotesByCreatorId(creatorId, userId);
    let user = await GetUserById(creatorId);

    return NextResponse.json([notes, user], {
      status: 201,
      statusText: 'Success',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      statusText: 'Failed to load notes',
    });
  }
}

// Function to handle PATCH requests for updating user profile data
export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId') as string;
    const username = formData.get('username') as string | null;
    const password = formData.get('password') as string | null;
    const file = formData.get('file');

    if (!userId || SQLSyntaxCheck([userId, username, password])) {
      return NextResponse.json({ status: 400, statusText: 'Bad request' });
    }

    const updates: { [key: string]: any } = {};
    if (username) updates.username = username;
    if (password) updates.password = await bcrypt.hash(password, 10);
    if (file) updates.profile_picture_url = await WriteImage(file);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          message: 'No fields to update',
        },
        {
          status: 400,
          statusText: 'No fields to update',
        }
      );
    }

    await UserClass.Update(userId, updates);

    let pfpEncoded;
    if (file) pfpEncoded = await GetProfileImage(updates.profile_picture_url);

    return NextResponse.json(
      {
        pfpEncoded,
        message: 'User updated successfully',
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to update user',
      },
      {
        status: 500,
      }
    );
  }
}

// Function to handle DELETE requests for deleting a user
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await UserClass.Delete(userId);

    return NextResponse.json(
      { message: 'You have succesfully deleted your profile' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to delete user',
      },
      {
        status: 500,
      }
    );
  }
}
