// External packages
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { SearchableHeader } from '@/components/ui/SearchableHeader';

// Images
import ImageExample from '@/public/images/login-image.png';

export default function Disover() {
  return (
    <>
      <SearchableHeader title="Discover" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center sm:mt-12 lg:mt-16">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="sm:-mr-4">
            {[...Array(8)].map((_, i) => (
              <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                <NoteCard
                  title="Biology"
                  description="Lorem ipsum dolorem"
                  likes={100}
                  author="Ivan Horvat"
                  userImage={
                    <Image
                      src={ImageExample}
                      alt="Add alt"
                      className="size-full rounded-full object-cover"
                    />
                  }
                  key={i}
                />
              </LayoutColumn>
            ))}
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
