// External packages
import Link from 'next/link';

// Components
import { Logo } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <>
      <Logo className="absolute left-4 top-8 lg:left-12" />
      <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-medium text-red-400 xl:text-5xl">
          404 page - not found 😑
        </h1>
        <Link href="/login" className="text-md">
          Let's get you to the log in page?
        </Link>
      </div>
    </>
  );
}
