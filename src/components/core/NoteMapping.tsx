'use client';

// External packages
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { LoadingSkeletonNote } from './discover/LoadingSkeletonNote';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';

// Models (types)
import { type Note } from '@/models/note';

// Component that is responsible for mapping and searching all the notes
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
        (note.details?.toLowerCase().includes(search) ?? false)
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
          description={note.details ?? ''}
          numberOfLikes={note.likes}
          isPublic={note.is_public}
          author={note.creator_name}
          liked={note.liked}
          creatorId={note.creator_id}
          encodedUserImage={note.encoded_profile_image ?? undefined}
          encodedImage={note.encoded_image}
          imageUrl={note.image_url}
          key={note.id}
        />
      </LayoutColumn>
    ));
};
