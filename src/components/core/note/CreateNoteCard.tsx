// External packages
import { FileTextIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

// Components
import { DialogCreate } from '@/components/core/note/DialogCreate';

export const CreateNoteCard = () => {
  return (
    <DialogCreate>
      <div className="group flex aspect-square cursor-pointer flex-col rounded-2xl border-2 border-blue-400">
        <div className="flex h-3/4 items-center justify-center border-b border-blue-400">
          <FileTextIcon className="h-24 w-24 text-blue-900 transition-colors duration-200 group-hover:text-blue-400" />
        </div>
        <div className="flex flex-1 items-center justify-between px-4">
          <h4 className="lg:text-md">Create new note</h4>
          <DoubleArrowRightIcon className="size-10 text-blue-400 transition-transform duration-200 group-hover:translate-x-3" />
        </div>
      </div>
    </DialogCreate>
  );
};
