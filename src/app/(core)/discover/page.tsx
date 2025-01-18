// External packages
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { DiscoverMapping } from '@/components/core/discover/DiscoverMapping';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { Note } from '@/models/note';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NoteCard } from '@/components/core/NoteCard';

export default async function Disover() {
  let notes: Array<Note> = [];

  const session = await getServerSession(authOptions);
  const userId = await session.user.id;

  try {
    const response = await fetch(`http://localhost:3000/api/core/discover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    let data: any = null;
    if (response.ok) {
      data = await response.json();
    }
    notes = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
  }

  return (
    //Ja mogu brisati tuđe noteove: Ne, to sam samo mapirao samo da se nesto prikaze (bez api-ja) - sada napravim  ???
    <>
      <SearchableHeader title="Discover" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="sm:-mr-4">
            {notes.map((note, i) => (
              <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                <NoteCard
                  noteId={note.id}
                  title={note.title}
                  description={note.details}
                  likes={note.likes}
                  author={note.creator_name}
                  liked={note.liked}
                  userId={userId}
                  key={i}
                />
              </LayoutColumn>
            ))}
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
