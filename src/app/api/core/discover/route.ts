// External packages
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Models
import { GetPublicNotes } from '@/database/pool';
import { GetImage } from '@/database/ImageHandler';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {

  try {
    const { userId } = await req.json();

    let notes = await GetPublicNotes(20, 0, userId);
    
    await notes.forEach(async note => {
      note.encoded_image = await GetImage(note.image_url)
    });

    if (!notes) {
      return NextResponse.json({ status: 400, statusText: 'No notes found' });
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      statusText: 'Failed to get notes',
    });
  }
}
