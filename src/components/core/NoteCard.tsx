// External packages
import {
  HeartIcon,
  HeartFilledIcon,
  TrashIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import Image, { ImageProps } from 'next/image';

// Components
import { DialogChangeDetails } from '@/components/core/note/DialogChangeDetails';
import { DialogDelete } from '@/components/core/note/DialogDelete';
import { Avatar } from '@/components/ui/Avatar';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const NoteCard: React.FC<{
  title: string;
  description?: string;
  author: string;
  likes: number;
  userImage?: React.ReactNode;
}> = ({ title, description, userImage, author, likes }) => {
  return (
    <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400">
      <Link href="/" className="flex aspect-square flex-col p-6 pb-4">
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          {description && <p className="text-xs font-medium">{description}</p>}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {userImage || <Avatar>ah</Avatar>}

            <Link
              href="/public-profile"
              className="font-medium underline-offset-2 hover:underline"
            >
              {author}
            </Link>
          </div>
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
          <DialogChangeDetails>
            <Pencil1Icon
              className={twJoin(
                'size-9 transition-colors hover:text-blue-400 lg:size-7'
              )}
            />
          </DialogChangeDetails>
        </li>
        <li>
          <DialogDelete>
            <TrashIcon
              className={twJoin(
                'size-9 transition-colors hover:text-blue-400 lg:size-7'
              )}
            />
          </DialogDelete>
        </li>
      </ul>
    </div>
  );
};
