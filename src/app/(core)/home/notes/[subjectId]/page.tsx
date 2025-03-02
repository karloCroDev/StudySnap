// External packages
import { type Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateNoteCard } from '@/components/core/note/CreateNoteCard';
import { NoteMapping } from '@/components/core/NoteMapping';

// Models (types)
import { Note } from '@/models/note';

// Metadata
export const metadata: Metadata = {
  title: 'Notes',
  description: 'See all your desired notes in one place',
};

async function getNotes(subjectId: string) {
  const response = await fetch(
    `http://localhost:3000/api/core/home/notes?subjectId=${subjectId}`
  );

  if (!response.ok) throw new Error('Failed to fetch data');

  return await response.json();
}

export default async function Notes({
  params,
}: {
  params: { subjectId: string };
}) {
  const { subjectId } = params;
  const session = await getServerSession(authOptions);
  // Restricted access to only users that are already logged in!
  if (!session) {
    redirect('/login');
  }
  const notes: Note[] = await getNotes(subjectId);
  return (
    <>
      <SearchableHeader title="Your notes" />
      <LayoutRow className="mt-8 justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            <LayoutColumn
              sm={6}
              lg={4}
              xl2={3}
              className="mb-8 animate-card-apperance sm:pr-4"
            >
              <CreateNoteCard subject={subjectId} />
            </LayoutColumn>
            <NoteMapping notesData={notes} />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
