'use client';

// External packages
import * as React from 'react';
import Image from 'next/image';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { SubjectCard } from '@/components/core/subjects/SubjectCard';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';

// Images
import ImageExample from '@/public/images/login-image.png';

// Models (types)
import { Subject } from '@/models/subject';

export const SubjectMapping: React.FC<{
  subjects: Subject[];
  images: string[] // Passing the fetched data to this object
}> = ({ subjects, images }) => {
  const search = useGeneralInfo((state) => state.search);

  return subjects
    .filter(
      (subject) =>
        subject.name.toLowerCase().includes(search) ||
        subject.details.toLowerCase().includes(search)
    )
    .map((subject) => (
      <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
        <SubjectCard
          id={subject.id}
          title={subject.name}
          description={subject.details}
          /*image={
            <div className="absolute left-0 top-0 -z-10 h-full w-full">
              <Image
                src={subject.image? subject.image : ImageExample} //Todo make image visible
                alt="Informative image about subject"// Returns error that image does not have good width dimensions
                className="h-full object-cover brightness-50"
              />
            </div>
          }*/
          key={subject.id}
        />
      </LayoutColumn>
    ));
};

// NOT IN USE, import it in page when I get data (use from the page directory )
