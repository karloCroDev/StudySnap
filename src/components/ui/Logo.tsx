// Libs
import { plus_jakarta_sans } from '@/libs/fonts';
import { twMerge } from 'tailwind-merge';

export const Logo: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...rest
}) => (
  <p
    {...rest}
    className={twMerge(
      'text-lg font-semibold !italic sm:text-2xl lg:text-3xl',
      plus_jakarta_sans.className,
      className
    )}
  >
    StudySnap
  </p>
);
