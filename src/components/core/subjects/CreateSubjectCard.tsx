// External packages
import { PlusIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

// Components
import { DialogCreateSubject } from '@/components/core/subjects/DialogCreateSubject';

export const CreateSubjectCard = () => (
  <DialogCreateSubject>
    <div className="group flex aspect-square cursor-pointer flex-col rounded-2xl border-2 border-blue-400">
      <div className="flex h-3/4 items-center justify-center border-b border-blue-400">
        <PlusIcon className="h-24 w-24 text-blue-900 transition-colors duration-200 group-hover:text-blue-400" />
      </div>
      <div className="flex flex-1 items-center justify-between px-4">
        <h4 className="text-md">Create subject</h4>
        <DoubleArrowRightIcon className="size-10 text-blue-400 transition-transform duration-200 group-hover:translate-x-3" />
      </div>
    </div>
  </DialogCreateSubject>
);
