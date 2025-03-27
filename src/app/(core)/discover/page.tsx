// External packages
import { type Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { NoteMapping } from '@/components/core/NoteMapping';

// Models (types)
import { type Note } from '@/models/note';

// Metadata
export const metadata: Metadata = {
  title: 'Dicover ',
  description:
    'Explore the wonderlands of users notes, that will boost your studies to the sky 🚀',
  openGraph: {
    title: 'Discover ',
    description:
      'Explore the wonderlands of users notes, that will boost your studies to the sky 🚀',
    siteName: 'StudySnap',
    images: {
      url: '/images/favicon-logo.png',
    },
  },
};

async function getPublicNotes(userId: string, filter: string) {
  const response = await fetch(`http://localhost:3000/api/core/discover`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, filter }),
  });
  if (!response.ok) throw new Error('Failed to fetch data');

  return await response.json();
}

export default async function Disover() {
  const session = await getServerSession(authOptions);
  // Handling the anonymous user inside the application
  const userId: string = session?.user.id || null;
  const publicNotes: Note[] = await getPublicNotes(userId, "filter");

  return (
    <>
      <SearchableHeader title="Discover" />
      <LayoutRow className="mt-8 justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="sm:-mr-4">
            <NoteMapping notesData={publicNotes} />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
