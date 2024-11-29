// External packages
import {
  DoubleArrowRightIcon,
  TrashIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

// Components
import { DeleteDialog } from '@/components/core/subjects/DeleteDialog';

export const SubjectCard: React.FC<{
  title: string;
  description?: string;
  image?: React.ReactNode;
}> = ({ title, description, image }) => {
  return (
    <div
      className={twJoin(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400 p-6 pb-4',
        image ? 'text-gray-100' : 'text-blue-900'
      )}
    >
      <Link href="/" passHref={false} className="flex aspect-square flex-col">
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

      <ul className="absolute right-5 top-8 z-20 flex gap-4 duration-200 group-hover:opacity-100 md:pointer-events-none md:animate-card-options-unhovered md:opacity-0 md:transition-opacity md:group-hover:pointer-events-auto md:group-hover:animate-card-options-hover">
        <li>
          <DeleteDialog>
            <Pencil1Icon
              className={twJoin(
                'z-max size-9 transition-colors lg:size-7',
                image ? 'hover:text-gray-200' : 'hover:text-blue-400'
              )}
            />
          </DeleteDialog>
        </li>
        <li>
          <TrashIcon
            className={twJoin(
              'z-max size-9 transition-colors lg:size-7',
              image ? 'hover:text-gray-200' : 'hover:text-blue-400'
            )}
          />
        </li>
      </ul>
    </div>
  );
};
