'use client';

// External packages
import * as React from 'react';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';
import { LayoutColumn } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';

// Models (types)
import { Note } from '@/models/note';

// Images
import ImageExample from '@/public/images/login-image.png';

export const DiscoverMapping: React.FC<{
  publicNotes: Note[];
  userId: string;
}> = ({ publicNotes, userId }) => {
  const search = useGeneralInfo((state) => state.search);

  return publicNotes
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
          author={note.creator_name}
          isPublic={note.is_public}
          liked={note.liked}
          creatorId={note.creator_id}
          userId={userId}
          key={note.id}
        />
      </LayoutColumn>
    ));
};
