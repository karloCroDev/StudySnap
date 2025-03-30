'use client';

// External packages
import * as React from 'react';

// Store
import { useToastStore } from '@/store/useToastStore';

// Models (types)
import { type Note } from '@/models/note';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const useExploreNotes = ({
  userId,
  setNotes,
}: {
  userId: number;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) => {
  const { getItem, setItem } = useLocalStorage('offset'); // Making sure that when explore more is clicked, even when refreshed new unseen values will be displayed
  const [loadingExplore, setLoadingExplore] = React.useState(false);

  // Karlo: Put 6 when more notes come
  const [offset, setOffset] = React.useState(getItem() || 0);

  console.log(offset);
  const toast = useToastStore((state) => state.setToast);

  const exploreNotes = async () => {
    try {
      setLoadingExplore(true);
      const response = await fetch(`http://localhost:3000/api/core/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, offset, limit: 1 }),
      });
      if (!response.ok)
        toast({
          title: 'Error',
          content: 'Error while getting the data, please try again',
          variant: 'error',
        });
      const data = await response.json();
      setNotes((prev) => [...prev, ...data]);
      // Karlo: Put 6 when more notes come
      const updatedOffset = offset + 1;
      setOffset(updatedOffset);
      setItem(updatedOffset);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingExplore(false);
    }
  };

  return { exploreNotes, loadingExplore };
};
