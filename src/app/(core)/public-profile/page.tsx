// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Avatar } from '@/components/ui/Avatar';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { NoteCard } from '@/components/core/NoteCard';

export default function PublicProfile() {
  return (
    <>
      <div className="animate-public-profile-initial-apperance mb-12 lg:mb-16">
        <Avatar size="lg" className="mx-auto mb-8">
          Ivan Horvat
        </Avatar>
        <h1 className="mb-12 text-center text-4xl font-semibold lg:mb-16">
          Ivan Horvat
        </h1>
      </div>
      <SearchableHeader title="All notes" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center sm:mt-12 lg:mt-16">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            {[...Array(7)].map((_, i) => (
              <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                <NoteCard
                  title="Biology"
                  description="Lorem ipsum dolorem"
                  likes={100}
                  author="Ivan Horvat"
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
