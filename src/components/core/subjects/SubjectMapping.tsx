'use client';

// External packages
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { SubjectCard } from '@/components/core/subjects/SubjectCard';
import Image from 'next/image';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';
import ImageExample from '@/public/images/login-image.png';

// Models (types)
import { Subject } from '@/models/subject';

export const SubjectMapping: React.FC<{
  subjectsData: Subject[];
}> = ({ subjectsData }) => {

  const { search, subjects, setSubjects } = useGeneralInfo(
    useShallow((state) => ({
      search: state.search,
      subjects: state.subjects,
      setSubjects: state.setSubjects,
    }))
  );

  React.useEffect(() => {
    setSubjects(subjectsData);
  }, []);

  if (!subjects.length) return;
  
  return subjects
    .filter((subject) => subject !== null && subject !== undefined)
    .filter(
      (subject) =>
        subject.name.toLowerCase().includes(search) ||
        subject.details.toLowerCase().includes(search)
    )

    .map((subject: Subject) => (
      <LayoutColumn
        sm={6}
        lg={4}
        xl2={3}
        className="mb-8 animate-card-apperance sm:pr-4"
      >
        <SubjectCard
          id={subject.id}
          title={subject.name}
          description={subject.details}
          image={
            <div className="absolute left-0 top-0 -z-10 h-full w-full">
              <Image
                src={subject.encoded_image != null ? `data:image/jpeg;base64,${subject.encoded_image}` : ImageExample}
                alt="Informative image about subject"
                className="h-full object-cover brightness-50"
                width = "500"
                height = "500"
              />
            </div>
          }
          key={subject.id}
        />
      </LayoutColumn>
    ));
};