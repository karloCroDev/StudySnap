// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/core/note-editor/TipTapEditor';

export default function NoteEditor() {
  return (
    <LayoutRow className="h-[calc(100vh-116px-16px)] justify-center overflow-hidden 2xl:h-[calc(100vh-144px-32px)]">
      <LayoutColumn lg={10} xl2={10} className="flex h-full flex-col">
        <TipTapEditor />
      </LayoutColumn>
    </LayoutRow>
  );
}
