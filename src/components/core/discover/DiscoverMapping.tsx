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
  console.log(userId);
  return publicNotes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(search) ||
        note.creator_name.toLowerCase().includes(search) ||
        note.details.toLowerCase().includes(search)
    )
    .map((note) => (
      <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
        <NoteCard
          noteId={note.id}
          title={note.title}
          description={note.details}
          likes={note.likes}
          author={note.creator_name} // Luka: Okay I guess, but if user updates their username, then your going to need to update the user inside the every note, right?
          liked={note.liked}
          userId={userId} // Luka: This is your id (of user that your logged in). I need from every user his id, not only my id. See public profile, I am passing that id to url
          key={note.id}
        />
      </LayoutColumn>
    ));
};
