'use client';

// External packages
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { SubjectCard } from '@/components/core/subjects/SubjectCard';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';
import { useSubjectStore } from '@/store/useSubjectStore';

// Models (types)
import { type Subject } from '@/models/subject';

// Component that is responsible for mapping and searching all the subjects
export const SubjectMapping: React.FC<{
  subjectsData: Subject[];
}> = ({ subjectsData }) => {
  const { subjects, setSubjects } = useSubjectStore(
    useShallow((state) => ({
      subjects: state.subjects,
      setSubjects: state.setSubjects,
    }))
  );
  const search = useGeneralInfo((state) => state.search);
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
          encodedImage={subject.encoded_image}
          imageUrl={subject.image_url}
          key={subject.id}
        />
      </LayoutColumn>
    ));
};
