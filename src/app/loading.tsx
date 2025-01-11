// Components
import { Spinner } from '@/components/ui/Spinner';
import { Logo } from '@/components/ui/Logo';

export default function Loading() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center gap-8">
      <Logo className="animate-bounce" />
      <Spinner size="md" />
    </div>
  );
}
