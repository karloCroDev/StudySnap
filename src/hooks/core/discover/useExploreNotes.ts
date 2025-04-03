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
  isBiggerThanHalf,
  offsetPosition,
}: {
  userId: number;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  isBiggerThanHalf: boolean;
  offsetPosition: number;
}) => {
  const { getItem, setItem } = useLocalStorage('offset'); // Making sure that when explore more is clicked, even when refreshed new unseen values will be displayed
  const [loadingExplore, setLoadingExplore] = React.useState(false);

  // Karlo: Put 6 when more notes come
  const [offset, setOffset] = React.useState(getItem() || offsetPosition);

  console.log(offset);
  const toast = useToastStore((state) => state.setToast);

  const exploreNotes = async () => {
    try {
      setLoadingExplore(true);
      const limit = isBiggerThanHalf ? -1 : 1;
      const response = await fetch(`http://localhost:3000/api/core/discover?`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, offset, limit }),
      });
      const data = await response.json();
      if (!response.ok)
        toast({
          title: 'Error',
          content: data.message,
          variant: 'error',
        });
      console.log(data);
      setNotes((prev) => [...prev, ...data]);
      // Karlo: Put 6 when more notes come
      const updatedOffset = offset + limit;
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
