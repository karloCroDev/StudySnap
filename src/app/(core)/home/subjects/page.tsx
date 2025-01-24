// External packages
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateSubjectCard } from '@/components/core/subjects/CreateSubjectCard';
import { SubjectMapping } from '@/components/core/subjects/SubjectMapping';

// Models (types)
import { Subject } from '@/models/subject';

async function getSubjects(session: any) {
  const response = await fetch(
    `http://localhost:3000/api/core/home/subjects?userId=${session.user.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!response.ok) throw new Error('Failed to fetch data');

  return await response.json();
}

export default async function Subjects() {
  const session = await getServerSession(authOptions);
  const [subjects, images] = await getSubjects(session);

  return (
    <>
      <SearchableHeader title="Subjects" />
      <LayoutRow className="mt-8 justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            <LayoutColumn
              sm={6}
              lg={4}
              xl2={3}
              className="animate-card-apperance mb-8 sm:pr-4"
            >
              <CreateSubjectCard />
            </LayoutColumn>
            <SubjectMapping subjects={subjects} images={images} />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
