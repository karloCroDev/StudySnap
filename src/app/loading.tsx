// External packages
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-8">
      <div className="relative size-36">
        <Image
          src="/images/favicon-logo.png"
          alt="Logo of StudySnap"
          className="h-full w-full object-cover"
          fill
        />
      </div>
      <ul className="flex gap-4">
        <li className="size-4 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]"></li>
        <li className="size-4 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]"></li>
        <li className="size-4 animate-bounce rounded-full bg-blue-400"></li>
      </ul>
    </div>
  );
}
