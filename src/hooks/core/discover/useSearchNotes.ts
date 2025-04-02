'use client';

// External packages
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Models (types)
import { type Note } from '@/models/note';

export const useSearchNotes = ({
  debouncedSearch,
  search,
  userId,
}: {
  userId: number;
  search: string;
  debouncedSearch: string;
}) => {
  const [loadingSearchNotes, setLoadingSearchNotes] = React.useState(false);
  const [notesQuery, setNotesQuery] = React.useState<Note[]>([]);

  const toast = useToastStore((state) => state.setToast);

  // Getting the data from the server
  React.useEffect(() => {
    const noteQuery = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/core/discover?userId=${userId}&filter=${debouncedSearch}&limit=${8}`
        );
        if (!response.ok) {
          toast({
            title: 'Error',
            content: 'Error while getting the data please try again',
            variant: 'error',
          });
          return;
        }
        const data = await response.json();
        setNotesQuery(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingSearchNotes(false);
      }
    };
    if (debouncedSearch) noteQuery();
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (search !== debouncedSearch) setLoadingSearchNotes(true); // Show skeleton as soon as user starts to type (not when the api call starts)

    if (!debouncedSearch && !search) {
      // If the search filed is emptied, show the default data from the server
      setLoadingSearchNotes(false);
      setNotesQuery([]);
    }
  }, [search, debouncedSearch]);

  return { notesQuery, loadingSearchNotes };
};
