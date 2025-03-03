// External packages
import { NextResponse, NextRequest } from 'next/server';

// Models
import { LikeClass } from '@/models/like';

//Function for liking and disliking the notes
export async function POST(req: NextRequest) {
  try {
    const { noteId, userId, exists } = await req.json();

    if (!noteId || !userId) {
      return NextResponse.json({ status: 400 });
    }
    if (exists) {
      await LikeClass.Delete(userId, noteId);
    } else {
      await LikeClass.Insert(userId, noteId);
    }
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500 });
  }
}
