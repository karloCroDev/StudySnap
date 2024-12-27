// External packages
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const Logo: React.FC<
  React.ComponentPropsWithoutRef<'a'> & Omit<LinkProps, 'href'>
> = ({ className, href, ...rest }) => (
  <Link
    {...rest}
    href={href || '/home/subjects'}
    className={twMerge(
      'text-lg font-semibold !italic sm:text-2xl lg:text-3xl',
      plus_jakarta_sans.className,
      className
    )}
  >
    StudySnap
  </Link>
);
