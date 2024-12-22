'use client';

// Eternal packagess
import * as React from 'react';
import { HeartIcon, HeartFilledIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';

// Components
import { Button } from '@/components/ui/Button';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const TipTapEditor = () => {
  return (
    <div className="relative mt-8 flex h-full flex-col overflow-hidden rounded-3xl border border-blue-900 p-8">
      <div className="absolute right-6 top-6 rounded-lg bg-gray-100 p-2">
        <Button
          colorScheme="light-blue"
          variant="solid"
          iconRight={<Pencil2Icon className="size-5" />}
          className="font-medium"
        >
          Edit
        </Button>
      </div>
      <div className="prose h-full !max-w-none !overflow-scroll scroll-smooth">
        <h1>Hello world</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in
          rem. Officia, id mollitia hic ducimus dolorem cumque sint aspernatur
          nam architecto libero totam, recusandae similique. Aut corrupti
          architecto sint!
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
        <Button rounded="full" colorScheme="black" variant="outline">
          🪄 Quizz yourself
        </Button>
      </div>
    </div>
  );
};
