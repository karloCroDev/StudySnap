// Components
import { Spinner } from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
