// Etxenral packages
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Avatar } from '@/components/ui/Avatar';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { NoteCard } from '@/components/core/NoteCard';
import { useSession } from 'next-auth/react';
import { Note } from '@/models/note';

export default async function PublicProfile() {
  const session = await getServerSession(authOptions);
  const userId = await session.user.id
  let notes: Array<Note> = [];
  try {
    const response = await fetch(`http://localhost:3000/api/core/public-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: session.user.id }),
    });

    const data = await response.json();
    notes = Array.isArray(data) ? data : [];
    console.log(notes)
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div className="mb-12 animate-public-profile-initial-apperance lg:mb-16">
        <Avatar
          imageProps={{
            src: session.user.image,
            alt: '',
          }}
          size="xl"
          className="mx-auto mb-8"
        >
          {session.user.name}
        </Avatar>
        <h1 className="mb-12 text-center text-4xl font-semibold lg:mb-16">
          {session.user.name}
        </h1>
      </div>
      <SearchableHeader title="All notes" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          {/* All notes that are public!!! */}
          <LayoutRow className="pr-0 sm:-mr-4">
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
        <LayoutColumn lg={8}></LayoutColumn>
      </LayoutRow>
    </>
  );
}
