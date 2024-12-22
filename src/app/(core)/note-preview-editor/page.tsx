'use client';

// External packages
import * as React from 'react';
import { useCurrentEditor } from '@tiptap/react';

// Had to use other icons becase the original ones are not available
import { LuHeading1 } from 'react-icons/lu';
import { LuHeading2 } from 'react-icons/lu';
import { LuHeading3 } from 'react-icons/lu';
import { LuHeading4 } from 'react-icons/lu';
import { LuBold } from 'react-icons/lu';
import { LuUnderline } from 'react-icons/lu';
import { LuItalic } from 'react-icons/lu';
import { MdFormatListBulleted } from 'react-icons/md';
import { MdFormatListNumbered } from 'react-icons/md';
import { LuUndo2 } from 'react-icons/lu';
import { LuRedo2 } from 'react-icons/lu';
import { FaStrikethrough } from 'react-icons/fa';

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor as MyEditor } from '@/components/core/note-editor/TipTapEditor';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export default function Note() {
  const { editor } = useCurrentEditor();
  if (editor === null) return null;

  return (
    <LayoutRow className="h-[calc(100vh-132px-32px)] justify-center overflow-hidden lg:h-[calc(100vh-168px-32px)]">
      <LayoutColumn lg={10} className="flex h-full flex-col">
        <div className="flex h-24 items-center gap-8 rounded-2xl border border-blue-900 px-6 py-5">
          <Link
            href="/home/notes"
            className={twMerge(
              'text-lg font-semibold !italic underline-offset-2 hover:underline',
              plus_jakarta_sans.className
            )}
          >
            History/WWII
          </Link>
          <hr className="h-full w-0.5 rounded-full border-0 bg-blue-900" />
          <div className="flex h-full flex-1 items-center gap-3">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
              }
            >
              <LuHeading1 className="size-8" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
              }
            >
              <LuHeading2 className="size-8" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
              }
            >
              <LuHeading3 className="size-8" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={
                editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
              }
            >
              <LuHeading4 className="size-8" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <LuBold className="size-8" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <LuItalic className="size-8" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <LuUnderline className="size-8" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <MdFormatListBulleted className="size-8" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              <MdFormatListNumbered className="size-8" />
            </button>
          </div>
          <hr className="h-full w-0.5 rounded-full border-0 bg-blue-900" />
          <div className="flex gap-4">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <LuUndo2 className="size-8" />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <LuRedo2 className="size-8" />
            </button>
          </div>
        </div>
        <MyEditor />
      </LayoutColumn>
    </LayoutRow>
  );
}
