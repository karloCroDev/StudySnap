// Etxenral packages
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Avatar } from '@/components/ui/Avatar';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { ProfileMapping } from '@/components/core/profile/ProfileMapping';

// Models (types)
import { Note } from '@/models/note';

async function getPublicProfileNotes(userId: string) {
  const response = await fetch(
    `http://localhost:3000/api/core/public-profile`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    }
  );

  if (!response.ok) throw new Error('Error with fetching');
  return await response.json();
}

export default async function PublicProfile({
  params, // Params for accessing the userId
}: {
  params: { userId: string };
}) {
  // const session = await getServerSession(authOptions);
  // const userId: string = await session.user.id; // Handle immediate changes on client if user updates his data

  const { userId } = params;
  const notes: Note[] = await getPublicProfileNotes(userId);

  return (
    <>
      <div className="mb-12 animate-public-profile-initial-apperance lg:mb-16">
        <Avatar
          imageProps={{
            // src: session?.user.image,
            alt: '',
          }}
          size="xl"
          className="mx-auto mb-8"
        >
          {/* {session?.user.name} */}
        </Avatar>
        <h1 className="mb-12 text-center text-4xl font-semibold lg:mb-16">
          {/* {session?.user.name} */}
        </h1>
      </div>
      <SearchableHeader title="All notes" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          {/* All notes that are public!!! */}
          <LayoutRow className="pr-0 sm:-mr-4">
            <ProfileMapping notes={notes} userId={userId} />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
