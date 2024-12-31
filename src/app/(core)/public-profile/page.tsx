// Etxenral packages
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Avatar } from '@/components/ui/Avatar';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { NoteCard } from '@/components/core/NoteCard';
import { useSession } from 'next-auth/react';

export default async function PublicProfile() {
  const session = await getServerSession(authOptions);

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
            {[...Array(7)].map((_, i) => (
              <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                <NoteCard
                  title="Biology"
                  description="Lorem ipsum dolorem"
                  likes={100}
                  author={session.user.name}
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
