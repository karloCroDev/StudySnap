// External packages
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateSubjectCard } from '@/components/core/subjects/CreateSubjectCard';
import { SubjectCard } from '@/components/core/subjects/SubjectCard';

// Images
import ImageExample from '@/public/images/login-image.png';

export default function Subjects() {
  return (
    <>
      <SearchableHeader title="Subjects" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center sm:mt-12 lg:mt-16">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
              <CreateSubjectCard />
            </LayoutColumn>
            {[...Array(7)].map((_, i) => {
              if ((i + 1) % 2) {
                return (
                  <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                    <NoteCard
                      title="Biology"
                      description="Lorem ipsum dolorem"
                      likes={100}
                      author="Ivan Horvat"
                      key={i}
                    />
                  </LayoutColumn>
                );
              } else {
                return (
                  <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                    <SubjectCard
                      title="Biology"
                      image={
                        <div className="absolute left-0 top-0 -z-10 h-full w-full">
                          <Image
                            src={ImageExample}
                            alt="Informative image about subject"
                            className="h-full object-cover brightness-50"
                          />
                        </div>
                      }
                    />
                  </LayoutColumn>
                );
              }
            })}
          </LayoutRow>
        </LayoutColumn>
        <LayoutColumn lg={8}></LayoutColumn>
      </LayoutRow>
    </>
  );
}
