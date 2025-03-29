// Etxenral packages
import { type Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Avatar } from '@/components/ui/Avatar';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { NoteMapping } from '@/components/core/NoteMapping';
import { SelectOption } from '@/components/core/profile/SelectOption';

// Metadata
export const metadata: Metadata = {
  title: 'Public profile',
  description: 'Lets see contributions from your colleauges and friends 🕵️',
  openGraph: {
    title: 'Public profile',
    description: 'Lets see contributions from your colleauges and friends 🕵️',
    siteName: 'StudySnap',
    images: {
      url: '/images/favicon-logo.png',
    },
  },
};

async function getAllLikedUsersPosts(creatorId: number) {
  const response = await fetch(
    `http://localhost:3000/api/core/public-profile?creatorId=${creatorId}`
  );

  if (!response.ok) throw new Error('Error with fetching');

  return await response.json();
}

async function getPublicProfileNotes(creatorId: number, userId: number) {
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
  params: { userId: number };
}) {
  const creatorId = params.userId;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id || null;

  const likedNotes = await getAllLikedUsersPosts(creatorId);
  const [notes, user] = await getPublicProfileNotes(creatorId, userId);

  return (
    <>
      <div className="mb-12 animate-public-profile-initial-apperance lg:mb-16">
        <Avatar
          imageProps={{
            src: `data:image/jpeg;base64,${user.encoded_image}`,
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
      {/* <SearchableHeader title="All notes" /> */}
      <SelectOption
        username={user.username}
        likedNotes={likedNotes}
        publicNotes={notes}
      />
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
