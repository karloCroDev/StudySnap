// note: Create landing page if we have time

// Components
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Logo />
      <Button variant="outline" colorScheme="black" className="flex-grow-[1]">
        Hello world
      </Button>
      <Button variant="outline" className="min-w-[6rem] flex-grow-0">
        A
      </Button>
    </div>
  );
}
