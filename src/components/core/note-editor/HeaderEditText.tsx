'use client';

// External packages
import * as React from 'react';
import { Editor as EditorType } from '@tiptap/react';
import { Button } from 'react-aria-components';

// Had to use other icons becase the original ones are not available
import { LuHeading1, LuStrikethrough } from 'react-icons/lu';
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

import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const HeaderEditText: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const isGivenOptionActive = 'bg:brightness-90';
  if (editor === null) return null;

  return (
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
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? isGivenOptionActive : ''
          }
        >
          <LuHeading1 className="size-8" />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? isGivenOptionActive : ''
          }
        >
          <LuHeading2 className="size-8" />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? isGivenOptionActive : ''
          }
        >
          <LuHeading3 className="size-8" />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? isGivenOptionActive : ''
          }
        >
          <LuHeading4 className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? isGivenOptionActive : ''}
        >
          <LuBold className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? isGivenOptionActive : ''}
        >
          <LuItalic className="size-8" />
        </Button>
        <Button
          //   onPress={() => editor.chain().focus().toggle().run()}
          className={editor.isActive('underline') ? isGivenOptionActive : ''}
        >
          <LuUnderline className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('underline') ? isGivenOptionActive : ''}
        >
          <LuStrikethrough className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? isGivenOptionActive : ''}
        >
          <MdFormatListBulleted className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? isGivenOptionActive : ''}
        >
          <MdFormatListNumbered className="size-8" />
        </Button>
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
  );
};
