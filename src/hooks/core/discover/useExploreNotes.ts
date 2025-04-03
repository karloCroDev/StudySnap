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
  const { getItem, setItem, removeItem } = useLocalStorage('offset'); // Use removeItem to clear storage
  const [loadingExplore, setLoadingExplore] = React.useState(false);

  // Retrieve offset and check if expired
  React.useEffect(() => {
    const EXPIRY_TIME = 100 * 60; // 10 sec (set to producytion to be a bigger number  )

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

  const [offset, setOffset] = React.useState(offsetPosition);
  const toast = useToastStore((state) => state.setToast);

  const exploreNotes = async () => {
    try {
      setLoadingExplore(true);
      const limit = 1;
      const response = await fetch(`http://localhost:3000/api/core/discover?`, {
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

      setNotes((prev) => [...prev, ...data]);

      // Update offset and timestamp
      console.log(isBiggerThanHalf);
      const updatedOffset = offset + (isBiggerThanHalf ? -1 : 1);
      setOffset(updatedOffset);
      setItem({ value: updatedOffset, timestamp: Date.now() });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingExplore(false);
    }
  };

  return { exploreNotes, loadingExplore };
};
