// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/core/note-editor/TipTapEditor';

export default async function NoteEditor({ params }: { params: { noteId: string } }) {

  const { noteId } = params;

  return (
    <LayoutRow className="h-[calc(100vh-116px-16px)] justify-center overflow-hidden 2xl:h-[calc(100vh-144px-32px)]">
      <LayoutColumn lg={10} xl2={10} className="flex h-full flex-col">
        <TipTapEditor noteId = {noteId} />
      </LayoutColumn>
    </LayoutRow>
  );
}
