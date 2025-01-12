'use client';

//External packages
import * as React from 'react';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Button as ReactAriaButton } from 'react-aria-components';
import { twMerge, twJoin } from 'tailwind-merge';

// Libs
import { plus_jakarta_sans } from '@/lib/fonts';

export const LikeComponent: React.FC<{
  hasBeenLiked: boolean;
  numberOfLikes: number;
  isOrderReversed?: boolean;
  size?: 'sm' | 'lg';
  // action: () => void;
}> = ({
  hasBeenLiked,
  isOrderReversed = false,
  numberOfLikes,
  size = 'sm',
  // action,
}) => {
  const [isLiked, setIsLiked] = React.useState(hasBeenLiked);

  const likeNote = () => {
    console.log('Like this note');
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
        onPress={() => {
          likeNote();
          setIsLiked(!isLiked);
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
        className={twMerge(
          '!italic',
          size === 'sm' && 'font-semibold',
          size === 'lg' && 'text-md font-bold',
          plus_jakarta_sans.className
        )}
      >
        {numberOfLikes + (isLiked ? 1 : 0)}
      </p>
    </div>
  );
};
