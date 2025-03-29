'use client';

// External packages
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { LoadingSkeletonNote } from '@/components/core/discover/LoadingSkeletonNote';
import { Button } from '@/components/ui/Button';

// Hooks
import { useDebounce } from '@/hooks/useDebounce';

// Store
import { useGeneralInfo } from '@/store/useGeneralInfo';
import { useDiscoverStore } from '@/store/useDiscoverStore';

// Models (types)
import { type Note } from '@/models/note';

// Component that is responsible for mapping and searching all the notes
export const DisocverMapping: React.FC<{
  userId: number;
  notesData: Note[];
}> = ({ userId, notesData }) => {
  const { addFetchedNotes, notes, setNotes } = useDiscoverStore(
    useShallow((state) => ({
      notes: state.notes,
      setNotes: state.setNotes,
      addFetchedNotes: state.addFetchedNotes,
    }))
  );
  React.useEffect(() => {
    setNotes(notesData);
  }, [notesData]);

  const search = useGeneralInfo((state) => state.search);
  const debouncedSearch = useDebounce(search);

  const [loading, setLoading] = React.useState(false);
  const [notesQuery, setNotesQuery] = React.useState<Note[]>([]);

  React.useEffect(() => {
    const noteQuery = async () => {
      try {
        // setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/core/discover`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, filter: debouncedSearch }),
          }
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setNotesQuery(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (debouncedSearch) noteQuery();
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (!debouncedSearch) setLoading(false);
    if (search !== debouncedSearch) setLoading(true);
  }, [search, debouncedSearch]);

  if (loading) {
    return (
      <LayoutRow className="sm:-mr-4">
        {[...Array(3)].map((_, index) => (
          <LayoutColumn
            sm={6}
            lg={4}
            xl2={3}
            className="mb-8 animate-card-apperance sm:pr-4"
          >
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
      <LayoutRow className="sm:-mr-4">
        {notes.map((note) => (
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
        ))}
      </LayoutRow>
      <Button rounded="full" colorScheme="light-blue" className="mx-auto">
        Explore more
      </Button>
    </>
  );
};
