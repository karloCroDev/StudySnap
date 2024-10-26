// Libs (fonts)
import { plus_jakarta_sans } from '@/libs/fonts';
import { twMerge } from 'tailwind-merge';

export const Logo: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...rest
}) => (
  <p
    {...rest}
    className={twMerge(
      'text-3xl font-semibold !italic',
      plus_jakarta_sans.className,
      className
    )}
  >
    StudySnap
  </p>
);
