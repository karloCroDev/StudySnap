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
  publicNotes,
  offsetPosition,
}: {
  userId: number | null;
  publicNotes: Note[];
  offsetPosition: number;
}) => {
  const [notes, setNotes] = React.useState(publicNotes);

  const { getItem, setItem, removeItem } = useLocalStorage('offset');

  const [loadingExplore, setLoadingExplore] = React.useState(false);

  const [offset, setOffset] = React.useState(offsetPosition);

  // Retrieve offset and check if expired
  React.useEffect(() => {
    const EXPIRY_TIME = 100 * 60; // time to delete the offset in local storage, same time used as caching the notes (8 hourss)

    const storedData = getItem();
    if (storedData) {
      const { value, timestamp } = storedData;
      const now = Date.now();

      if (now - timestamp > EXPIRY_TIME) {
        removeItem();
        setOffset(offsetPosition);
      } else {
        setOffset(value);
      }
    }
  }, []);

  const toast = useToastStore((state) => state.setToast);

  // Fetching additional notes from server
  const exploreNotes = async () => {
    try {
      setLoadingExplore(true);
      const limit = 4;
      const response = await fetch(`/api/core/discover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, offset, limit }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Error',
          content: data.message,
          variant: 'error',
        });
      }
      console.log(data);
      setNotes((prev) => [...prev, ...data]);

      // Update offset and timestamp
      const updatedOffset = offset + limit;
      setOffset(updatedOffset);
      setItem({ value: updatedOffset, timestamp: Date.now() });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingExplore(false);
    }
  };

  return { notes, exploreNotes, loadingExplore };
};
