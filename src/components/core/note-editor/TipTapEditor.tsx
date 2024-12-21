'use client';

// Eternal packagess
import * as React from 'react';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';

// Components
import { Button } from '@/components/ui/Button';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const TipTapEditor = () => {
  return (
    <div className="mt-8 flex flex-1 flex-col rounded-3xl border border-blue-900 p-8">
      <div className="prose h-full !max-w-none overflow-y-auto">
        <h1>Hello world</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cum
          necessitatibus voluptatibus perferendis sed recusandae pariatur
        </p>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div className="flex cursor-pointer items-center gap-2">
          <HeartIcon className="size-8" />
          <p
            className={twMerge(
              'text-md font-bold !italic',
              plus_jakarta_sans.className
            )}
          >
            200
          </p>
        </div>
        <Button rounded="full" colorScheme="light-blue">
          🪄 Quizz yourself
        </Button>
      </div>
    </div>
  );
};
