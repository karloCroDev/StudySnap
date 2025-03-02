'use client';

// External packages
import * as React from 'react';
import {
  DoubleArrowRightIcon,
  TrashIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';

// Components
import { DialogDelete } from '@/components/core/subjects/DialogDelete';
import { DialogChangeDetails } from '@/components/core/subjects/DialogChangeDetails';

// Subject card that contains notes
export const SubjectCard: React.FC<{
  id: string;
  title: string;
  description?: string;
  encodedImage?: string | null;
}> = ({ id, title, description = '', encodedImage }) => {
  const [cardTitle, setCardTitle] = React.useState(title);
  const [cardDescription, setCardDescription] = React.useState(description);
  const [cardImage, setCardImage] = React.useState<string>('');

  return (
    <div
      className={twJoin(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400',
        cardImage || encodedImage ? 'text-gray-100' : 'text-blue-900'
      )}
    >
      <Link
        href={`/home/notes/${id}`}
        className="flex aspect-square flex-col p-6 pb-4"
      >
        {(encodedImage || cardImage) && (
          <div className="absolute left-0 top-0 -z-10 h-full w-full">
            <Image
              src={
                cardImage ||
                (encodedImage && `data:image/jpeg;base64,${encodedImage}`) ||
                ''
              }
              alt="Informative image about subject"
              className="h-full object-cover brightness-50"
              fill
            />
          </div>
        )}
        <div>
          <h3 className="w-3/5 break-words text-xl font-semibold">
            {cardTitle}
          </h3>
          {description && (
            <p
              className={twJoin(
                'text-xs font-medium',
                cardImage || encodedImage ? 'text-gray-200' : 'text-gray-400'
              )}
            >
              {cardDescription}
            </p>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="font-medium">Check out your notes</p>
          <DoubleArrowRightIcon className="size-6 transition-transform duration-200 group-hover:translate-x-3" />
        </div>
      </Link>

      <ul className="md:ity absolute right-5 top-8 flex gap-4 duration-200 group-hover:opacity-100 md:pointer-events-none md:animate-card-options-unhovered md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:animate-card-options-hover">
        <li>
          <DialogChangeDetails
            id={id}
            cardTitle={cardTitle}
            cardDescription={cardDescription}
            setCardTitle={setCardTitle}
            setCardDescripton={setCardDescription}
            setCardImage={setCardImage}
          >
            <Pencil1Icon
              className={twJoin(
                'size-9 transition-colors lg:size-7',
                cardImage || encodedImage
                  ? 'hover:text-gray-200'
                  : 'hover:text-blue-400'
              )}
            />
          </DialogChangeDetails>
        </li>
        <li>
          <DialogDelete id={id} name={cardTitle}>
            <TrashIcon
              className={twJoin(
                'size-9 transition-colors lg:size-7',
                cardImage || encodedImage
                  ? 'hover:text-gray-200'
                  : 'hover:text-blue-400'
              )}
            />
          </DialogDelete>
        </li>
      </ul>
    </div>
  );
};
