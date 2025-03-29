'use client';

// External packages
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { LoadingSkeletonNote } from '@/components/core/discover/LoadingSkeletonNote';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';

// Models (types)
import { type Note } from '@/models/note';

// Component that is responsible for mapping and searching all the notes
export const DisocverMapping: React.FC<{
  notesData: Note[];
}> = ({ notesData }) => {
  if (!notesData.length) return;

  return notesData.map((note) => (
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
      {/* <LoadingSkeletonNote /> */}
    </LayoutColumn>
  ));
};
