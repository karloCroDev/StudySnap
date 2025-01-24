'use client';

// External packages
import * as React from 'react';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';
import { LayoutColumn } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';

// Models (types)
import { Note } from '@/models/note';

export const NoteMapping: React.FC<{
  notes: Note[];
  userId: string;
}> = ({ notes, userId }) => {
  const search = useGeneralInfo((state) => state.search);

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
        className="animate-card-apperance mb-8 sm:pr-4"
      >
        <NoteCard
          noteId={note.id}
          title={note.title}
          description={note.details}
          numberOfLikes={note.likes}
          author={note.creator_name}
          liked={note.liked}
          userId={userId}
          creatorId={note.creator_id}
          key={note.id}
        />
      </LayoutColumn>
    ));
};

// NOT IN USE, import it in page when I get data
