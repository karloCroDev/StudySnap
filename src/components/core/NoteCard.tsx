// External packages
import {
  HeartIcon,
  HeartFilledIcon,
  TrashIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

// Components
import { DialogDelete } from '@/components/core/note/DialogDelete';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const NoteCard: React.FC<{
  title: string;
  description?: string;
  author: string;
  likes: number;
  image?: React.ReactNode; // note: set this to pro feature if we have time to implement
}> = ({ title, description, image, author, likes }) => {
  return (
    <div
      className={twJoin(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400',
        image ? 'text-gray-100' : 'text-blue-900'
      )}
    >
      <Link href="/" className="flex aspect-square flex-col p-6 pb-4">
        {image}
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          {description && (
            <p
              className={twJoin(
                'text-xs font-medium',
                image ? 'text-gray-200' : 'text-gray-400'
              )}
            >
              {description}
            </p>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between">
          {/* Add pfp */}
          <p className="font-medium">{author}</p>
          <div className="gap'4 flex items-center gap-2">
            <p
              className={twJoin(
                'font-semibold !italic',
                plus_jakarta_sans.className
              )}
            >
              {likes}
            </p>
            <HeartFilledIcon className="size-6 text-red-400" />
          </div>
          {/* <HeartFilledIcon /> */}
        </div>
      </Link>

      <ul className="absolute right-5 top-8 flex gap-4 duration-200 group-hover:opacity-100 md:pointer-events-none md:animate-card-options-unhovered md:opacity-0 md:transition-opacity md:group-hover:pointer-events-auto md:group-hover:animate-card-options-hover">
        <li>
          <DialogDelete>
            <Pencil1Icon
              className={twJoin(
                'size-9 transition-colors lg:size-7',
                image ? 'hover:text-gray-200' : 'hover:text-blue-400'
              )}
            />
          </DialogDelete>
        </li>
        <li>
          <TrashIcon
            className={twJoin(
              'size-9 transition-colors lg:size-7',
              image ? 'hover:text-gray-200' : 'hover:text-blue-400'
            )}
          />
        </li>
      </ul>
    </div>
  );
};
