'use client';

// External packages
import * as React from 'react';
import Image from 'next/image';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';

// Images
import ImageExample from '@/public/images/login-image.png';

// Models (types)
import { Note } from '@/models/note';

export const NoteMapping: React.FC<{
  notesData: Note[];
}> = ({ notesData }) => {
  const { search, notes, setNotes } = useGeneralInfo(
    useShallow((state) => ({
      search: state.search,
      notes: state.notes,
      setNotes: state.setNotes,
    }))
  );

  React.useEffect(() => {
    setNotes(notesData);
  }, []);

  if (!notes.length) return;
  return notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(search) ||
        note.creator_name.toLowerCase().includes(search) ||
        note.details.toLowerCase().includes(search)
    )
    .map((note) => (
      <LayoutColumn
        sm={6}
        lg={4}
        xl2={3}
        className="mb-8 animate-card-apperance sm:pr-4"
      >
        <NoteCard
          noteId={note.id}
          title={note.title}
          description={note.details}
          numberOfLikes={note.likes}
          isPublic={note.is_public}
          author={note.creator_name}
          liked={note.liked}
          creatorId={note.creator_id}
          key={note.id}
          image={
            <div className="absolute left-0 top-0 -z-10 h-full w-full">
              <Image
                src={ImageExample}
                alt="Informative image about subject"
                className="h-full object-cover brightness-[45%]"
                width="500"
                height="500"
              />
            </div>
          }
        />
      </LayoutColumn>
    ));
};

// NOT IN USE, import it in page when I get data
