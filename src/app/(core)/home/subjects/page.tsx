'use client';

// External packages
import Image from 'next/image';
import {
  PlusIcon,
  ArrowRightIcon,
  DoubleArrowRightIcon,
  TrashIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';

// Components
import { SearchableHeader } from '@/components/ui/SearchableHeader';

// Images
import ImageExample from '@/public/images/login-image.png';
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';

// This  needs to be converted to open modals, and seperated into components

export default function Subjects() {
  return (
    <>
      <SearchableHeader title="Subjects" />
      <LayoutRow className="mt-16 justify-center">
        <LayoutColumn xs={10}>
          <LayoutRow className="gap-5">
            <LayoutColumn sm={6} md={5} lg={4} xl2={3}>
              <div className="h-76 group flex cursor-pointer flex-col rounded-2xl border-2 border-blue-400">
                <div className="flex h-[70%] items-center justify-center border-b border-blue-400">
                  <PlusIcon className="h-24 w-24 text-blue-900" />
                </div>
                <div className="flex flex-1 items-center justify-between px-4">
                  <h4 className="text-md font-medium">Create new subject</h4>
                  <ArrowRightIcon className="size-10 text-blue-400 transition-transform group-hover:translate-x-3" />
                </div>
              </div>
            </LayoutColumn>

            <LayoutColumn sm={6} lg={4} xl2={3}>
              <div className="h-76 group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400 p-6 pb-4 text-gray-100">
                <div className="absolute left-0 top-0 -z-10 h-full w-full">
                  <Image
                    src={ImageExample}
                    alt="Informative image about subject"
                    className="h-full object-cover brightness-50"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">Biology</h3>
                  <p className="text-xs font-medium text-gray-200">
                    Lorem ipsum dolorem
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <p className="text-base font-medium">Check out your notes</p>
                  <DoubleArrowRightIcon className="size-6 transition-transform group-hover:translate-x-3" />
                </div>

                <ul className="group-hover:animate-card-options-hover animate-card-options-unhovered pointer-events-none absolute right-5 top-8 flex gap-4 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <li>
                    <CheckCircledIcon className="size-8 transition-colors hover:text-gray-200" />
                  </li>
                  <li>
                    <TrashIcon className="size-8 transition-colors hover:text-gray-200" />
                  </li>
                </ul>
              </div>
            </LayoutColumn>
          </LayoutRow>
        </LayoutColumn>
        <LayoutColumn lg={8}></LayoutColumn>
      </LayoutRow>
    </>
  );
}
