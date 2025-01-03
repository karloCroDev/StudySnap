// External packages
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GetSubjectByCreatorId } from '@/app/api/database/pool';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateSubjectCard } from '@/components/core/subjects/CreateSubjectCard';
import { SubjectCard } from '@/components/core/subjects/SubjectCard';

// Images
import ImageExample from '@/public/images/login-image.png';

export default async function Subjects() {
  const session = await getServerSession(authOptions);
  const subjects = await GetSubjectByCreatorId(session.user.id);
  return (
    <>
      <SearchableHeader title="Subjects" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
              <CreateSubjectCard />
            </LayoutColumn>
            {subjects.map(( subject, i) => {
                return (
                  <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                    <SubjectCard
                      id = {subject.id}
                      title= {subject.name}
                      description={subject.details}
                      image={
                        <div className="absolute left-0 top-0 -z-10 h-full w-full">
                          <Image
                            src={ImageExample}//Todo make image visible
                            alt="Informative image about subject"
                            className="h-full object-cover brightness-50"
                          />
                        </div>
                      }
                      key={i}
                    />
                  </LayoutColumn>
                );
              }
            )}
          </LayoutRow>
        </LayoutColumn>
        <LayoutColumn lg={8}></LayoutColumn>
      </LayoutRow>
    </>
  );
}
