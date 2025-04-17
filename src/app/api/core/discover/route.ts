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
    const userId = searchParams.get('userId') as unknown as string;
    const filter = searchParams.get('filter') ?? '';
    const limit = Number(searchParams.get('limit')) || 8;

    // Handling the search option inside the dicscover page
    if (filter) {
      const publicNotes = await GetPublicNotes(limit, 0, userId, filter);
      return NextResponse.json(publicNotes, { status: 200 });
    }

    // Random offset for the first 10 notes (most popular ones), so that user doesn't always get the same most popular order
    const randomOffset = Math.floor(Math.random() * 6);
    console.log(randomOffset);
    const publicNotes: Note[] = await GetPublicNotes(
      limit,
      randomOffset,
      userId!,
      filter
    );

    const totalNotes = await GetNumberOfPublicNotes();

    const minOffset = randomOffset + limit; // Minimum offset to get the next notes (so that user doesn't get the same notes again)

    // const maxOffset = Math.floor(totalNotes / 2); // Scales better notes when there will be a bigger amount of notes

    const nextOffset =
      Math.floor(Math.random() * (totalNotes - 4 - minOffset + 1)) + minOffset; // Random number between minumum offset and the length of public notes in db --> interval: [minOffset, maxOffset]

    const dataToSend: DiscoverResopnses = {
      offsetPosition: nextOffset, // Passing the next offset position to the client (so that user knows what to fetch)
      publicNotes,
    };

    return NextResponse.json(dataToSend, { status: 200 });
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

    // Handling the count of the offset so that if it goes over the limit of the notes, it will get random notes from the database, instead of returning nothing
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
