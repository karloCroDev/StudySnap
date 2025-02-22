'use client';

//External packages
import * as React from 'react';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Button as ReactAriaButton } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';

export const LikeComponent: React.FC<{
  hasBeenLiked: boolean;
  userId: string;
  noteId: string;
  numberOfLikes: number;
  isOrderReversed?: boolean;
  size?: 'sm' | 'lg';
}> = ({
  hasBeenLiked,
  noteId,
  userId,
  isOrderReversed = false,
  numberOfLikes,
  size = 'sm',
}) => {
  const [isLiked, setIsLiked] = React.useState(hasBeenLiked);
  const [likeCount, setLikeCount] = React.useState(numberOfLikes);

  const likeAction = async () => {
    try {
      await fetch('http://localhost:3000/api/core/home/notes/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteId,
          userId,
          exists: isLiked,
        }), //image
      });
    } catch (error) {
      console.error(error);
    }
  };
  // fix: Move action over here and get the crucial info that is needed
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
        onPress={() => {
          const syncLiked = !isLiked;
          setIsLiked(syncLiked);
          setLikeCount(syncLiked ? likeCount + 1 : likeCount - 1);
          likeAction();

          // Karlo: Use optimistic UI to update the like count
        }}
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
