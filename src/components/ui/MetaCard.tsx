// External packages
import {
  DoubleArrowRightIcon,
  TrashIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

export const MetaCard: React.FC<{
  type: string;
  title: string;
  description: string;
  image?: React.ReactNode;
}> = ({ type, title, description, image }) => {
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
          <p
            className={twJoin(
              'text-xs font-medium',
              image ? 'text-gray-200' : 'text-gray-400'
            )}
          >
            {description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-base font-medium">Check out your {type}</p>
          <DoubleArrowRightIcon className="size-6 transition-transform duration-200 group-hover:translate-x-3" />
        </div>
      </Link>

      <ul className="pointer-events-none absolute right-5 top-8 flex animate-card-options-unhovered gap-4 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:animate-card-options-hover group-hover:opacity-100">
        <li>
          <CheckCircledIcon
            className={twJoin(
              'z-max size-8 transition-colors',
              image ? 'hover:text-gray-200' : 'hover:text-blue-400'
            )}
          />
        </li>
        <li>
          <TrashIcon
            className={twJoin(
              'z-max size-8 transition-colors',
              image ? 'hover:text-gray-200' : 'hover:text-blue-400'
            )}
          />
        </li>
      </ul>
    </div>
  );
};
