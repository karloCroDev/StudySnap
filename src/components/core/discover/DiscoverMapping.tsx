'use client';

// External packages
import * as React from 'react';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { LoadingSkeletonNote } from '@/components/core/discover/LoadingSkeletonNote';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchNotes } from '@/hooks/core/discover/useSearchNotes';
import { useExploreNotes } from '@/hooks/core/discover/useExploreNotes';

// Store
import { useGeneralStore } from '@/store/useGeneralStore';

// Models (types)
import { type DiscoverResopnses } from '@/app/api/core/discover/route';

// Component that is responsible for mapping and searching all the notes
export const DisocverMapping: React.FC<
  DiscoverResopnses & {
    userId: number | null;
  }
> = ({ userId, publicNotes, offsetPosition }) => {
  // Server side search logic
  const search = useGeneralStore((state) => state.search);

  const debouncedSearch = useDebounce(search);

  // Search notes (functuonality)
  const { loadingSearchNotes, notesQuery } = useSearchNotes({
    debouncedSearch,
    search,
    userId,
  });

  // Explore notes (functionality)
  const { loadingExplore, exploreNotes, notes } = useExploreNotes({
    publicNotes,
    userId,
    offsetPosition,
  });

  // Handling each case on what to render

  // Loading skeleton when the user is searching for notes
  if (loadingSearchNotes) {
    return (
      <LayoutRow className="sm:-mr-4">
        {[...Array(4)].map((_, index) => (
          <LayoutColumn
            sm={6}
            lg={4}
            xl2={3}
            className="mb-8 sm:pr-4"
            key={index}
          >
            <LoadingSkeletonNote />
          </LayoutColumn>
        ))}
      </LayoutRow>
    );
  }

  //
  if (notesQuery.length) {
    return (
      <LayoutRow className="sm:-mr-4">
        {notesQuery.map((note) => (
          <LayoutColumn
            sm={6}
            lg={4}
            xl2={3}
            className="mb-8 sm:pr-4"
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
              imageUrl={note.image_url}
              profileImageUrl={note.profile_image_url}
            />
          </LayoutColumn>
        ))}
      </LayoutRow>
    );
  }
  // Returning the page if there are no notes that user have been searching for
  if (!notesQuery.length && debouncedSearch) {
    return (
      <h1 className="mt-40 text-center text-xl">
        Uhoh 😑, we couldn&apos;t find anything simmilar to{' '}
        <strong>&quot;{debouncedSearch}&quot;</strong>
      </h1>
    );
  }

  return (
    <>
      <LayoutRow className="animate-card-apperance sm:-mr-4">
        {notes.map((note, index) => (
          <LayoutColumn
            sm={6}
            lg={4}
            xl2={3}
            className="mb-8 sm:pr-4"
            key={index}
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
              imageUrl={note.image_url}
              profileImageUrl={note.profile_image_url}
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
