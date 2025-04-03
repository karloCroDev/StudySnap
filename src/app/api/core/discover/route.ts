// External packages
import { NextResponse, NextRequest } from 'next/server';

// Database
import {
  GetNumberOfPublicNotes,
  GetPublicNotes,
  GetRandomNotes,
} from '@/db/core/discover';
import { Note } from '@/models/note';

//Function that gets all of the notes that are avalible to the public

export interface DiscoverResopnses {
  offsetPosition: number;

  publicNotes: Note[];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const filter = searchParams.get('filter') ?? '';
    const limit = Number(searchParams.get('limit')) || 4;

    if (!userId) {
      return NextResponse.json(
        {
          message: 'Please enter the valid ID!',
        },
        {
          status: 400,
        }
      );
    }

    // Handling the search
    if (filter) {
      const publicNotes = await GetPublicNotes(limit, 0, userId, filter);
      return NextResponse.json(publicNotes, { status: 200 });
    }

    const randomOffset = Math.round(Math.random() * 10); // Little bit of variety at first notes
    const publicNotes: Note[] = await GetPublicNotes(
      limit,
      randomOffset,
      userId,
      filter
    );
    return NextResponse.json(
      {
        offsetPosition: randomOffset + limit,
        publicNotes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to get notes',
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, offset, limit } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          message: 'Please enter the valid ID!',
        },
        {
          status: 400,
        }
      );
    }

    const totalPublicNotes = await GetNumberOfPublicNotes();

    if (offset + limit > totalPublicNotes) {
      const randomPublicNotes = await GetRandomNotes(limit, userId);
      return NextResponse.json(randomPublicNotes, {
        status: 200,
      });
    }

    const notes: Note[] = await GetPublicNotes(limit, offset, userId, '');
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to get notes',
      },
      {
        status: 500,
      }
    );
  }
}
// 100 biljeski --> prepolovi na pola --> ako je manje od pola +8 biljeski vrti --> ako je vise od pola -8 biljeski (biljeske s manjim brojem likeova)
// Cachaaj na 8h, stavi test za prezu na 3h
