// External packages
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { DiscoverMapping } from '@/components/core/discover/DiscoverMapping';

// Models (types)
import { Note } from '@/models/note';

async function getPublicNotes(userId: string) {
  const response = await fetch(`http://localhost:3000/api/core/discover`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }), // It would be niice if you make this with params
  });
  if (!response.ok) throw new Error('Failed to fetch data');

  return await response.json();
}

export default async function Disover() {
  const session = await getServerSession(authOptions);
  const userId: string = session.user.id;
  const publicNotes: Note[] = await getPublicNotes(userId);

  return (
    //Ja mogu brisati tuđe noteove: Ne, to sam samo mapirao samo da se nesto prikaze (bez api-ja) - sada napravim  ???
    <>
      <SearchableHeader title="Discover" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="sm:-mr-4">
            <DiscoverMapping publicNotes={publicNotes} userId="" />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
