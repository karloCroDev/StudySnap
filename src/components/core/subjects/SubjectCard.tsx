// External packages
import {
  DoubleArrowRightIcon,
  TrashIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

// Components
import { DialogDelete } from '@/components/core/subjects/DialogDelete';
import { DialogChangeDetails } from '@/components/core/subjects/DialogChangeDetails';

export const SubjectCard: React.FC<{
  id: string;
  title: string;
  description?: string;
  image?: React.ReactNode;
}> = ({ id, title, description, image }) => {
  return (
    <div
      className={twJoin(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400',
        image ? 'text-gray-100' : 'text-blue-900'
      )}
    >
      <Link
        href={`/home/notes/${id}`}
        className="flex aspect-square flex-col p-6 pb-4"
      >
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
          <p className="font-medium">Check out your notes</p>
          <DoubleArrowRightIcon className="size-6 transition-transform duration-200 group-hover:translate-x-3" />
        </div>
      </Link>

      <ul className="md:ity absolute right-5 top-8 flex gap-4 duration-200 group-hover:opacity-100 md:pointer-events-none md:animate-card-options-unhovered md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:animate-card-options-hover">
        <li>
          <DialogChangeDetails
          id = {id}>
            <Pencil1Icon
              className={twJoin(
                'size-9 transition-colors lg:size-7',
                image ? 'hover:text-gray-200' : 'hover:text-blue-400'
              )}
            />
          </DialogChangeDetails>
        </li>
        <li>
          <DialogDelete
            id = {id}>
            <TrashIcon
              className={twJoin(
                'size-9 transition-colors lg:size-7',
                image ? 'hover:text-gray-200' : 'hover:text-blue-400'
              )}
            />
          </DialogDelete>
        </li>
      </ul>
    </div>
  );
};
