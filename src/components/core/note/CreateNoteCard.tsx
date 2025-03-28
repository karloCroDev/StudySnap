// External packages
import { DoubleArrowRightIcon, FilePlusIcon } from '@radix-ui/react-icons';

// Components
import { DialogCreate } from '@/components/core/note/DialogCreate';

export const CreateNoteCard: React.FC<{
  subject: number;
}> = ({ subject }) => {
  return (
    <DialogCreate subjectId={subject}>
      <div className="group flex aspect-square cursor-pointer flex-col rounded-2xl border-2 border-blue-400">
        <div className="flex h-3/4 items-center justify-center border-b border-blue-400">
          <FilePlusIcon className="h-24 w-24 text-blue-900 transition-colors duration-200 group-hover:text-blue-400" />
        </div>
        <div className="flex flex-1 items-center justify-between px-4">
          <h4 className="text-md">Create note</h4>
          <DoubleArrowRightIcon className="size-10 text-blue-400 transition-transform duration-200 group-hover:translate-x-3" />
        </div>
      </div>
    </DialogCreate>
  );
};
