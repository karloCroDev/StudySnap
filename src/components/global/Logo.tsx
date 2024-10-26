// Libs (fonts)
import { plus_jakarta_sans } from '@/libs/fonts';
import { twMerge } from 'tailwind-merge';

export const Logo = () => (
  <p
    className={twMerge(
      'text-2xl font-semibold !italic',
      plus_jakarta_sans.className
    )}
  >
    StudySnap
  </p>
);
