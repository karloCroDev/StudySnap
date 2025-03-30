// External packages
import { HeartFilledIcon } from '@radix-ui/react-icons';

export const LoadingSkeletonNote = () => {
  return (
    <div className="group relative flex aspect-square flex-col gap-2 rounded-xl border-2 border-gray-400 p-6 pb-4">
      <div className="h-6 w-3/5 animate-pulse rounded bg-gray-400 [animation-delay:-0.15s]" />
      <div className="h-4 w-[75%] animate-pulse rounded bg-gray-400" />
      <div className="mt-auto flex items-center justify-between">
        <div className="flex h-6 w-full items-center gap-3">
          <div className="aspect-square h-full animate-pulse rounded-full bg-gray-400 [animation-delay:-0.3s]" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-400 [animation-delay:-0.3s]" />
        </div>
        <HeartFilledIcon className="size-6 animate-pulse text-gray-400 [animation-delay:-0.3s]" />
      </div>
    </div>
  );
};
