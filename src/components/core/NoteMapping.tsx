'use client';

// External packages
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { LoadingSkeletonNote } from './discover/LoadingSkeletonNote';

// Store
import { useGeneralStore } from '@/store/useGeneralStore';
import { useNoteStore } from '@/store/useNoteStore';

// Models (types)
import { type Note } from '@/models/note';

// Component that is responsible for mapping and searching all the notes
export const NoteMapping: React.FC<{
  notesData: Note[];
}> = ({ notesData }) => {
  const { notes, setNotes } = useNoteStore(
    useShallow((state) => ({
      notes: state.notes,
      setNotes: state.setNotes,
    }))
  );
  const search = useGeneralStore((state) => state.search);

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
        key={note.id}
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
          profileImageUrl={note.profile_image_url}
          imageUrl={note.image_url}
        />
      </LayoutColumn>
    ));
};
