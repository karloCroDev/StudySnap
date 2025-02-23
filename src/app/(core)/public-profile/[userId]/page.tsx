// Etxenral packages
import { type Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Avatar } from '@/components/ui/Avatar';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { NoteMapping } from '@/components/core/NoteMapping';

// Models (types)
import { Note } from '@/models/note';

// Metadata
export const metadata: Metadata = {
  title: 'Public profile',
  description: 'Lets see contributions from your colleauges and friends 🕵️',
  openGraph: {
    title: 'Public profile',
    description: 'Lets see contributions from your colleauges and friends 🕵️',
    siteName: 'StudySnap',
    images: {
      url: '/images/FaviconLogo.png',
    },
  },
};
async function getPublicProfileNotes(creatorId: string, userId: string) {
  const response = await fetch(
    `http://localhost:3000/api/core/public-profile`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ creatorId, userId }),
    }
  );

  if (!response.ok) throw new Error('Error with fetching');

  return await response.json();
}

export default async function PublicProfile({
  params, // Params for accessing the creatorId
}: {
  params: { userId: string };
}) {
  const creatorId = params.userId;
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const userId = session.user.id; // Assuming the token is stored in the session
  //const creatorId: string = await session.user.id; // Handle immediate changes on client if user updates his data

  const [notes, user] = await getPublicProfileNotes(creatorId, userId);
  return (
    <>
      <div className="mb-12 animate-public-profile-initial-apperance lg:mb-16">
        <Avatar
          imageProps={{
            src: user.image,
            alt: '',
          }}
          size="xl"
          className="mx-auto mb-8"
        >
          {user.username}
        </Avatar>
        <h1 className="mb-12 text-center text-4xl font-semibold lg:mb-16">
          {user.username}
        </h1>
      </div>
      <SearchableHeader title="All notes" />
      <LayoutRow className="mt-8 justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            <NoteMapping notesData={notes} />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
