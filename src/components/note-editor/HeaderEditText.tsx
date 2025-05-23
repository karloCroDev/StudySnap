'use client';

// External packages
import * as React from 'react';
import { Button as ReactAriaButton } from 'react-aria-components';
import { type Editor as EditorType } from '@tiptap/react';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

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
import { LuSubscript } from 'react-icons/lu';
import { LuSuperscript } from 'react-icons/lu';

// Components
import { DialogUploadImage } from '@/components/note-editor/DialogUploadImage';

// Databases
import { plus_jakarta_sans } from '@/lib/fonts';

// Header that has duty to edit text to the page
export const HeaderEditText: React.FC<{
  editor: EditorType;
  title: string;
}> = ({ editor, title }) => {
  const toolsHorizontalContainer = React.useRef<HTMLDivElement | null>(null);

  const scrollWithButtons = (direction: 'left' | 'right') => {
    const element = toolsHorizontalContainer.current;
    if (element) {
      if (direction === 'left') {
        element.scrollLeft -= 80;
      } else {
        element.scrollLeft += 80;
      }
    }
  };

  if (editor === null) return;
  return (
    <div className="flex h-20 animate-header-initial-apperance items-center gap-4 rounded-lg border border-blue-900 p-4 md:gap-6 lg:px-6 lg:py-5 xl:gap-8">
      <h1
        //Here is the deal, when I make discover notes, and notes from user then I will need to change this link
        className={twMerge(
          'hidden text-lg font-semibold !italic underline underline-offset-4 md:block',
          plus_jakarta_sans.className
        )}
      >
        {title}
      </h1>

      <hr className="hidden h-full w-px rounded-full border-0 bg-blue-900 md:block" />

      <ReactAriaButton
        className="hidden text-blue-400 outline-none transition-transform duration-75 active:scale-75 md:block"
        onPress={() => scrollWithButtons('left')}
      >
        <DoubleArrowLeftIcon className="size-8" />
      </ReactAriaButton>
      <div
        className="flex h-full flex-1 snap-x snap-mandatory snap-start items-center gap-2 overflow-scroll scroll-smooth md:gap-3"
        ref={toolsHorizontalContainer}
      >
        <ReactAriaButton
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
        </ReactAriaButton>
        <ReactAriaButton
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
        </ReactAriaButton>
        <ReactAriaButton
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
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive('paragraph')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <BsParagraph className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive('bold')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuBold className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuItalic className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive('underline')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuUnderline className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive('strike')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuStrikethrough className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleSubscript().run()}
          className={
            editor.isActive('subscript')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuSubscript className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleSuperscript().run()}
          className={
            editor.isActive('superscript')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuSuperscript className="size-8" />
        </ReactAriaButton>

        <DialogUploadImage editor={editor}>
          <LuImage className="size-8" />
        </DialogUploadImage>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive('bulletList')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <MdFormatListBulleted className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive('orderedList')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <MdFormatListNumbered className="size-8" />
        </ReactAriaButton>

        <ReactAriaButton
          onPress={() => editor.chain().focus().setTextAlign('left').run()}
          className={
            editor.isActive({ textAlign: 'left' })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuAlignLeft className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuAlignCenter className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().setTextAlign('right').run()}
          className={
            editor.isActive({ textAlign: 'right' })
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuAlignRight className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RxDividerHorizontal className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive('codeBlock')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <LuCodeXml className="size-8" />
        </ReactAriaButton>

        <ReactAriaButton
          onPress={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive('blockquote')
              ? 'is-given-option-active'
              : 'default-button'
          }
        >
          <ImQuotesLeft className="size-8" />
        </ReactAriaButton>
      </div>
      <ReactAriaButton
        className="hidden text-blue-400 outline-none transition-transform duration-75 active:scale-75 md:block"
        onPress={() => scrollWithButtons('right')}
      >
        <DoubleArrowRightIcon className="size-8" />
      </ReactAriaButton>

      <hr className="h-full w-px rounded-full border-0 bg-blue-900" />
      <div className="flex gap-2 md:gap-4">
        <ReactAriaButton
          onPress={() => editor.chain().focus().undo().run()}
          isDisabled={!editor.can().chain().focus().undo().run()}
          className="default-button outline-none disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <LuUndo2 className="size-8" />
        </ReactAriaButton>
        <ReactAriaButton
          onPress={() => editor.chain().focus().redo().run()}
          isDisabled={!editor.can().chain().focus().redo().run()}
          className="default-button outline-none disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <LuRedo2 className="size-8" />
        </ReactAriaButton>
      </div>
    </div>
  );
};
