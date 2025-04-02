'use client';

// External packages
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { LoadingSkeletonNote } from '@/components/core/discover/LoadingSkeletonNote';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchNotes } from '@/hooks/core/discover/useSearchNotes';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';

// Models (types)
import { type Note } from '@/models/note';
import { useExploreNotes } from '@/hooks/core/discover/useExploreNotes';

// Component that is responsible for mapping and searching all the notes
export const DisocverMapping: React.FC<{
  userId: number;
  notesData: Note[];
}> = ({ userId, notesData }) => {
  const [notes, setNotes] = React.useState<Note[]>(notesData);

  // Server side search logic
  const search = useGeneralInfo((state) => state.search); // Try to make this inside the component
  const debouncedSearch = useDebounce(search);

  const { loadingSearchNotes, notesQuery } = useSearchNotes({
    debouncedSearch,
    search,
    userId,
  });

  const { loadingExplore, exploreNotes } = useExploreNotes({
    setNotes,
    userId,
  });

  if (loadingSearchNotes) {
    return (
      <LayoutRow className="sm:-mr-4">
        {[...Array(4)].map((_, index) => (
          <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
            <LoadingSkeletonNote key={index} />
          </LayoutColumn>
        ))}
      </LayoutRow>
    );
  }

  if (notesQuery.length) {
    return (
      <LayoutRow className="sm:-mr-4">
        {notesQuery.map((note) => (
          <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
            <NoteCard
              noteId={note.id}
              title={note.title}
              description={note.details ?? ''}
              numberOfLikes={note.likes}
              isPublic={note.is_public}
              author={note.creator_name}
              liked={note.liked}
              creatorId={note.creator_id}
              imageUrl={note.image_url}
              profileImageUrl={note.profile_image_url}
              key={note.id}
            />
          </LayoutColumn>
        ))}
      </LayoutRow>
    );
  }
  if (!notesQuery.length && debouncedSearch) {
    return (
      <h1 className="mt-40 text-center text-xl">
        Uhoh 😑, we couldn't find anything simmilar to{' '}
        <strong>"{debouncedSearch}"</strong>
      </h1>
    );
  }

  return (
    <>
      <LayoutRow className="animate-card-apperance sm:-mr-4">
        {notes.map((note) => (
          <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
            <NoteCard
              noteId={note.id}
              title={note.title}
              description={note.details ?? ''}
              numberOfLikes={note.likes}
              isPublic={note.is_public}
              author={note.creator_name}
              liked={note.liked}
              creatorId={note.creator_id}
              imageUrl={note.image_url}
              profileImageUrl={note.profile_image_url}
              key={note.id}
            />
          </LayoutColumn>
        ))}
      </LayoutRow>
      <Button
        rounded="full"
        colorScheme="light-blue"
        className="mx-auto mb-16 animate-card-apperance"
        iconRight={loadingExplore && <Spinner />}
        onPress={exploreNotes}
      >
        Explore more
      </Button>
    </>
  );
};
