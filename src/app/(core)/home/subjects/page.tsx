'use client';

// External packages
import Image from 'next/image';
import {
  PlusIcon,
  ArrowRightIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';

// Components
import { Button } from '@/components/ui/Button';

// Images
import ImageExample from '@/public/images/login-image.png';

// This  needs to be converted to open modals, and seperated into components

export default function Subjects() {
  return (
    <div className="mt-32">
      <Button className="min-w-0" size="lg">
        <MagnifyingGlassIcon className="h-8 w-8" />
      </Button>
      <div className="h-[270px] w-[300px] cursor-pointer rounded-2xl border-2 border-blue-400">
        <div className="flex h-[70%] items-center justify-center">
          <PlusIcon className="h-24 w-24 text-blue-900" />
        </div>
        <hr className="h-px w-full border-0 bg-blue-400" />

        <div className="flex h-[30%] items-center justify-between px-4">
          <p className="text-md font-medium">Create new subject</p>
          <ArrowRightIcon className="size-10 text-blue-400" />
        </div>
      </div>
      {/* todo: Enter these values in tailwind config file */}

      <div className="mt-20"></div>

      <div className="relative h-[270px] w-[300px] cursor-pointer overflow-hidden rounded-xl border-2 border-blue-400 p-6 pb-4 text-gray-100">
        <Image
          src={ImageExample}
          alt="Informative image about subject"
          className="absolute left-0 top-0 -z-10 h-full w-full brightness-50"
        />
        <div className="flex h-full flex-col">
          <h3 className="text-2xl font-semibold">Biology</h3>
          <h6 className="text-xs font-medium text-gray-200">
            Lorem ipsum dolorem
          </h6>
          <div className="mt-auto flex items-center justify-between">
            <p className="text-base font-medium">Check out your notes</p>
            <DoubleArrowRightIcon className="size-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
