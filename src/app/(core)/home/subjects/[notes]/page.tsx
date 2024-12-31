// External packages
import Image from 'next/image';
import { getServerSession } from 'next-auth';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateNoteCard } from '@/components/core/note/CreateNoteCard';
import { SubjectCard } from '@/components/core/subjects/SubjectCard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Images
import ImageExample from '@/public/images/login-image.png';

export default async function Notes() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <SearchableHeader title="Your notes" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
              <CreateNoteCard />
            </LayoutColumn>
            {[...Array(7)].map((_, i) => (
              <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                <NoteCard
                  title="Biology"
                  description="Lorem ipsum do lorem"
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
