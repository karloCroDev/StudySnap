'use client';

// External packages
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Models (types)
import { type Note } from '@/models/note';

export const useExploreNotes = ({
  userId,
  addFetchedNotes,
}: {
  userId: number;
  addFetchedNotes: (val: Note[]) => void;
}) => {
  const [loadingExplore, setLoadingExplore] = React.useState(false);

  const toast = useToastStore((state) => state.setToast);

  const exploreNotes = async () => {
    try {
      setLoadingExplore(true);
      const response = await fetch(`http://localhost:3000/api/core/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok)
        toast({
          title: 'Error',
          content: 'Error while getting the data, please try again',
          variant: 'error',
        });
      const data = await response.json();
      addFetchedNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingExplore(false);
    }
  };

  return { exploreNotes, loadingExplore };
};
