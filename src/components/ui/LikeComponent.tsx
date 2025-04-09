'use client';

// External packages
import * as React from 'react';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Button as ReactAriaButton } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import { useSession } from 'next-auth/react';

// Store
import { useToastStore } from '@/store/useToastStore';

export const LikeComponent: React.FC<{
  hasBeenLiked: boolean;
  noteId: number;
  numberOfLikes: number;
  isOrderReversed?: boolean;
  size?: 'sm' | 'lg';
}> = ({
  hasBeenLiked,
  noteId,
  isOrderReversed = false,
  numberOfLikes,
  size = 'sm',
}) => {
  const user = useSession();
  const toast = useToastStore((state) => state.setToast);

  const [isLiked, setIsLiked] = React.useState(hasBeenLiked);
  const [likeCount, setLikeCount] = React.useState(numberOfLikes);

  const likeAction = async () => {
    if (!user.data) {
      toast({
        title: 'Uhuh not able to like note!',
        content: 'Please log in order to like this note',
        variant: 'error',
      });
      return;
    }

    const previousLikedState = isLiked;
    const previousLikeCount = likeCount;

    // Optimistic update
    const nextLikedState = !isLiked;
    setIsLiked(nextLikedState);
    setLikeCount(nextLikedState ? likeCount + 1 : likeCount - 1);

    try {
      const response = await fetch(
        'http://localhost:3000/api/core/home/notes/like',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            noteId,
            userId: user.data?.user.id,
            exists: previousLikedState, // send the real state before update
          }),
        }
      );

      if (!response.ok) {
        // Rollback on error
        setIsLiked(previousLikedState);
        setLikeCount(previousLikeCount);
      }
    } catch (error) {
      console.error(error);
      // Rollback on error
      setIsLiked(previousLikedState);
      setLikeCount(previousLikeCount);
    }
  };

  return (
    <div
      className={twJoin(
        'flex items-center gap-2',
        isOrderReversed && 'flex-row-reverse',
        size === 'lg' && 'text-lg'
      )}
    >
      <ReactAriaButton
        className="outline-none transition-transform duration-75 active:scale-75"
        onPress={likeAction}
      >
        {isLiked ? (
          <HeartFilledIcon
            className={twJoin(
              'text-red-400',
              size === 'sm' && 'size-6',
              size === 'lg' && 'size-8'
            )}
          />
        ) : (
          <HeartIcon
            className={twJoin(
              size === 'sm' && 'size-6',
              size === 'lg' && 'size-8'
            )}
          />
        )}
      </ReactAriaButton>
      <p
        className={twJoin(
          '!italic',
          size === 'sm' && 'font-semibold',
          size === 'lg' && 'text-md font-bold'
        )}
      >
        {likeCount}
      </p>
    </div>
  );
};
