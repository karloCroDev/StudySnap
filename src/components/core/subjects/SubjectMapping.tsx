'use client';

// External packages
import * as React from 'react';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';
import { LayoutColumn } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';

// Images
import ImageExample from '@/public/images/login-image.png';

export const DiscoverMapping: React.FC<{
  data?: {}; // Passing the fetched data to this object
}> = ({ data }) => {
  const search = useGeneralInfo((state) => state.search);
  console.log(search);
  return (
    <>
      {[...Array(8)].map((_, i) => {
        //    if (
        //      note.title === search ||
        //      note.desciption === search ||
        //      note.author === search
        //    )
        return (
          <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
            <NoteCard
              title="Biology"
              description="Lorem ipsum dolorem"
              likes={100}
              author="Ivan Horvat"
              userImage={ImageExample.src}
              key={i}
            />
          </LayoutColumn>
        );
      })}
    </>
  );
};

// NOT IN USE, import it in page when I get data (use from the page directory )
