// External packages
import { type Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { DisocverMapping } from '@/components/core/discover/DiscoverMapping';

// Models (types)
import { type Note } from '@/models/note';
import { type DiscoverResopnses } from '@/app/api/core/discover/route';

// Metadata
export const metadata: Metadata = {
  title: 'Discover ',
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

async function getPublicNotes(userId: number | null) {
  const response = await fetch(
    `http://localhost:3000/api/core/discover?userId=${userId}`,
    {
      next: { revalidate: 10 },
      // cache: 'no-cache',
    }
  );

  if (!response.ok) throw new Error('Failed to fetch data');

  return await response.json();
}

export default async function Disover() {
  const session = await getServerSession(authOptions);
  // Handling the anonymous user inside the application
  const userId = session?.user.id || null;
  const { publicNotes, offsetPosition }: DiscoverResopnses =
    await getPublicNotes(userId);

  return (
    <>
      <SearchableHeader title="Discover" />
      <LayoutRow className="mt-8 justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <DisocverMapping
            userId={userId}
            publicNotes={publicNotes}
            offsetPosition={offsetPosition}
          />
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
