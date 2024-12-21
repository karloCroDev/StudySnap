// External packages
import { twJoin } from 'tailwind-merge';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Button } from '@/components/ui/Button';
import { TipTapEditor } from '@/components/core/note-editor/TipTapEditor';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export default function Note() {
  return (
    <LayoutRow className="h-[calc(100vh-132px)] justify-center pb-8 lg:h-[calc(100vh-168px)]">
      <LayoutColumn lg={10} className="flex flex-col overflow-y-scroll">
        <div className="flex items-center justify-between">
          <h1
            className={twJoin(
              'text-3xl font-bold !italic underline underline-offset-4',
              plus_jakarta_sans.className
            )}
          >
            WWII
          </h1>
          <p className="text-md font-semibold italic text-gray-500">by: You</p>
        </div>
        <TipTapEditor />
      </LayoutColumn>
    </LayoutRow>
  );
}
