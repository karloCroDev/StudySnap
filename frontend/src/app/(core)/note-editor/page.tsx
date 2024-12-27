// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/core/note-editor/TipTapEditor';

export default function Note() {
  return (
    <LayoutRow className="h-[calc(100vh-132px-32px)] justify-center overflow-hidden xl:h-[calc(100vh-144px-32px)]">
      <LayoutColumn lg={10} className="flex h-full flex-col">
        <TipTapEditor />
      </LayoutColumn>
    </LayoutRow>
  );
}
