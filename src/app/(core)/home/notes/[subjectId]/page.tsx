// External packages
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateNoteCard } from '@/components/core/note/CreateNoteCard';
import { NoteMapping } from '@/components/core/NoteMapping';

// Images
import ImageExample from '@/public/images/login-image.png';

// Models (types)
import { Note } from '@/models/note';

async function getNotes({ session, subjectId }: any) {
  const response = await fetch(
    `http://localhost:3000/api/core/home/notes?subjectId=${subjectId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`, // I think this is not neccessary, will fix it after I am done with everything
      },
    }
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
  const userId = session.user.id;
  const notes: Note[] = await getNotes({ subjectId, session });

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
            <NoteMapping notesData={notes} userId={userId} />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
