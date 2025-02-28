// External packages
import { type Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
// import { DiscoverMapping } from '@/components/core/discover/DiscoverMapping';
import { NoteMapping } from '@/components/core/NoteMapping';

// Models (types)
import { Note } from '@/models/note';

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
      url: '/images/FaviconLogo.png',
    },
  },
};

async function getPublicNotes(userId: string) {
  const response = await fetch(`http://localhost:3000/api/core/discover`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('Failed to fetch data');

  return await response.json();
}

export default async function Disover() {
  const session = await getServerSession(authOptions);
  const userId: string = session?.user.id || 0;
  const publicNotes: Note[] = await getPublicNotes(userId);

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
