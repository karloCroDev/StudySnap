// External packages
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { Note } from '@/models/note';

// Database
import {
  GetNotesByCreatorId,
  GetUserById,
  GetLikedNotes,
} from '@/db/core/publicProfile';
import { WriteImage } from '@/db/imageHandler';

// Models
import { type User, UserClass } from '@/models/user';
import { SQLSyntaxCheck } from '@/lib/algorithms/stringVerification';

// Function to handle all liked posts from user

export interface PublicProfileGetResponse {
  likedNotes: Note[];
  creatorNotes: Note[];
  user: User;
}

// Getting all of the notes and user detals (public-profile page)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get('creatorId');
    const userId = searchParams.get('userId') as unknown as string;

    if (!creatorId || SQLSyntaxCheck([creatorId, userId])) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

    const likedNotes = await GetLikedNotes(userId, creatorId);

    const creatorNotes = await GetNotesByCreatorId(creatorId, userId);
    const user = await GetUserById(creatorId);

    return NextResponse.json(
      {
        likedNotes,
        creatorNotes,
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to load notes',
      },
      {
        status: 500,
      }
    );
  }
}

// Handling updates the user profile (username, password, profile picture)
export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId') as string;
    const username = formData.get('username') as string | null;
    const password = formData.get('password') as string | null;
    const file = formData.get('file');

    if (!userId || SQLSyntaxCheck([userId, username, password])) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
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

    return NextResponse.json(
      {
        pfpImage: updates.profile_picture_url,
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

// Deleting the user completely from the application and db
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
