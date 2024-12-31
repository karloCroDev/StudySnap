// External packages
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

// Libs
import { plus_jakarta_sans } from '@/lib/fonts';

export const Logo: React.FC<
  React.ComponentPropsWithoutRef<'a'> & Omit<LinkProps, 'href'>
> = ({ className, href, ...rest }) => (
  <Link
    {...rest}
    href={href || '/home/subjects'}
    className={twMerge(
      'text-lg font-semibold !italic sm:text-xl 2xl:text-2xl',
      plus_jakarta_sans.className,
      className
    )}
  >
    StudySnap
  </Link>
);
