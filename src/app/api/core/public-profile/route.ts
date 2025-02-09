// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import { GetNotesByCreatorId, GetUserById } from '@/database/pool';

// Models
import { UserClass } from '@/models/user';

import { WriteImage } from '@/database/ImageHandler';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    /*const token = await getToken({ req, secret });
        console.log("\n\n\n I am here", token)
    if (!token) {
          return NextResponse.json({ status: 401 });
        }*/

    //if (!await getToken({ req, secret })) return NextResponse.json({ status: 401, statusText: 'Unauthorized' });

    const { creatorId, userId } = await req.json();

    if (!userId || !creatorId) {
      return NextResponse.json({ status: 400, statusText: 'Insufficient data provided'});
    }

    let notes = await GetNotesByCreatorId(creatorId, userId);
    let user = await GetUserById(creatorId)

    return NextResponse.json([notes, user], { status: 201, statusText: "Success"});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Failed to load notes'});
  }
}

export async function PATCH(req: NextRequest) {
  try {
    //if (!await getToken({ req, secret })) return NextResponse.json({ status: 401, statusText: 'Unauthorized' });

    const formData = await req.formData();

    const userId = formData.get('user.Id') as string
    const username = formData.get('username') as string | null ;
    const password = formData.get('password') as string | null;
    const file = formData.get('file');

    if (!userId) {
      return NextResponse.json({ status: 400, statusText: 'User id is missing'});
    }

    const updates: { [key: string]: any } = {};
    if (username) updates.username = username;
    if (password) updates.password = await bcrypt.hash(password, 10);
    if (file) updates.image = await WriteImage(file);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ status: 400, statusText: 'No fields to update'});
    }

    await UserClass.Update(userId, updates);

    return NextResponse.json( { status: 200, statusText: 'User updated successfully'});
  } catch (error) {
    console.error(error);
    return NextResponse.json( { status: 500, statusText: 'Failed to update user'});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    //if (!await getToken({ req, secret })) return NextResponse.json({ status: 401, statusText: 'Unauthorized' });

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json( { status: 400, statusText: 'Missing required fields'});
    }

    await UserClass.Delete(userId);
    return NextResponse.json({ status: 200, statusText: 'Subject deleted successfully'});
  } catch (error) {
    console.error(error);
    return NextResponse.json( { status: 500, statusText: 'Failed to delete subject'});
  }
}

