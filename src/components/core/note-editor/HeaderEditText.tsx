'use client';

// External packages
import * as React from 'react';
import { Button } from 'react-aria-components';
import Link from 'next/link';
import { Editor as EditorType } from '@tiptap/react';

// Had to use other icons becase the original ones are not available
import { LuHeading1, LuStrikethrough } from 'react-icons/lu';
import { LuHeading2 } from 'react-icons/lu';
import { LuHeading3 } from 'react-icons/lu';
import { BsParagraph } from 'react-icons/bs';
import { LuBold } from 'react-icons/lu';
import { LuUnderline } from 'react-icons/lu';
import { LuItalic } from 'react-icons/lu';
import { MdFormatListBulleted } from 'react-icons/md';
import { MdFormatListNumbered } from 'react-icons/md';
import { LuUndo2 } from 'react-icons/lu';
import { LuRedo2 } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { LuAlignLeft } from 'react-icons/lu';
import { LuAlignCenter } from 'react-icons/lu';
import { LuAlignRight } from 'react-icons/lu';
import { LuImage } from 'react-icons/lu';
import { LuCodeXml } from 'react-icons/lu';
import { ImQuotesLeft } from 'react-icons/im';
import { RxDividerHorizontal } from 'react-icons/rx';

// Components
import { DialogURL } from '@/components/core/note-editor/DialogURL';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const HeaderEditText: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
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
      <hr className="h-full w-px rounded-full border-0 bg-blue-900" />
      <div className="flex h-full flex-1 items-center gap-3 overflow-x-scroll scroll-smooth">
        <DialogURL editor={editor}>
          <Button>
            <LuImage className="size-8" />
          </Button>
        </DialogURL>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuHeading1 className="size-8" />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuHeading2 className="size-8" />
        </Button>
        <Button
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuHeading3 className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive('paragraph')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <BsParagraph className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive('bold')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuBold className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuItalic className="size-8" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive('underline')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuUnderline className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive('strike')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuStrikethrough className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RxDividerHorizontal className="size-8" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive('bulletList')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <MdFormatListBulleted className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive('orderedList')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <MdFormatListNumbered className="size-8" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().setTextAlign('left').run()}
          className={
            editor.isActive({ textAlign: 'left' })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuAlignLeft className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuAlignCenter className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().setTextAlign('right').run()}
          className={
            editor.isActive({ textAlign: 'right' })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuAlignRight className="size-8" />
        </Button>

        <Button
          onPress={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive('codeBlock')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuCodeXml className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive('blockquote')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <ImQuotesLeft className="size-8" />
        </Button>
      </div>
      <hr className="h-full w-px rounded-full border-0 bg-blue-900" />
      <div className="flex gap-4">
        <Button
          onPress={() => editor.chain().focus().undo().run()}
          isDisabled={!editor.can().chain().focus().undo().run()}
          className="default-button outline-none disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <LuUndo2 className="size-8" />
        </Button>
        <Button
          onPress={() => editor.chain().focus().redo().run()}
          isDisabled={!editor.can().chain().focus().redo().run()}
          className="default-button outline-none disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <LuRedo2 className="size-8" />
        </Button>
      </div>
    </div>
  );
};
