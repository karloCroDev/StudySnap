'use client';

// Eternal packagess
import * as React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import CodeBlock from '@tiptap/extension-code-block';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import {
  HeartIcon,
  HeartFilledIcon,
  Pencil2Icon,
  FileTextIcon,
} from '@radix-ui/react-icons';
import { Button as ReactAriaButton } from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';

// Components
import { Button } from '@/components/ui/Button';
import { HeaderEditText } from '@/components/core/note-editor/HeaderEditText';
import { DialogQuizz } from '@/components/core/note-editor/DialogQuizz';

// Store
import { useToastStore } from '@/store/useToastStore';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const TipTapEditor = () => {
  const toast = useToastStore((state) => state.setToast);

  const [isEditing, setIsEditing] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CodeBlock,
      HorizontalRule,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: `
  <h1>
    Hi there,
  </h1>
  <p>
    this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code>body {
    display: none;
  }</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>
`,
    editable: isEditing,
  });

  React.useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [isEditing, editor]);

  if (editor === null) return null;
  return (
    <>
      {isEditing ? (
        <HeaderEditText editor={editor} />
      ) : (
        <div className="flex animate-header-initial-apperance items-center justify-between">
          <h1
            className={twJoin(
              'text-3xl font-bold !italic underline underline-offset-4',
              plus_jakarta_sans.className
            )}
          >
            WWII
          </h1>
          <p className="text-md font-semibold text-gray-500">by: You</p>
        </div>
      )}

      <div
        className={twJoin(
          'relative mt-8 flex h-full min-h-20 flex-col overflow-hidden rounded-3xl border border-blue-900 p-8 pb-6',
          isEditing
            ? 'animate-text-editor-editing'
            : 'animate-text-editor-initial-apperance'
        )}
      >
        {!isEditing && (
          <div className="absolute right-6 top-6 z-10 rounded-lg bg-gray-100 p-2">
            <Button
              colorScheme="light-blue"
              variant="solid"
              iconRight={<Pencil2Icon className="size-5" />}
              onPress={() => {
                toast({
                  title: 'Editing 🤔',
                  content: 'Your have entered editing mode',
                  variant: 'information',
                });
                setIsEditing(true);
              }}
              className="font-medium"
            >
              Edit
            </Button>
          </div>
        )}
        <div className="prose h-full !max-w-none !overflow-scroll scroll-smooth">
          <EditorContent
            editor={editor}
            disabled={true}
            className="text-editor"
          />
        </div>
        <div className="flex items-center justify-between gap-4 overflow-scroll py-2">
          {!isEditing ? (
            <>
              <div className="flex items-center gap-2">
                <ReactAriaButton
                  className="size-8 outline-none transition-transform duration-75 active:scale-75"
                  onPress={() => setIsLiked(!isLiked)}
                >
                  {isLiked ? (
                    <HeartFilledIcon className="size-8 text-red-400" />
                  ) : (
                    <HeartIcon className="size-8" />
                  )}
                </ReactAriaButton>
                <p
                  className={twMerge(
                    'text-md font-bold !italic',
                    plus_jakarta_sans.className
                  )}
                >
                  {200 + (isLiked ? 1 : 0)}
                </p>
              </div>
              <DialogQuizz>
                <Button rounded="full" colorScheme="black" variant="outline">
                  🪄 Quizz yourself
                </Button>
              </DialogQuizz>
            </>
          ) : (
            <>
              <Button rounded="full" className="min-w-fit">
                📸 Get notes from image
              </Button>
              <p className="hidden text-md text-gray-500 lg:block">
                Autocomplete: ctrl + /
              </p>

              <Button
                variant="outline"
                rounded="full"
                colorScheme="white"
                iconLeft={<FileTextIcon className="size-5" />}
                onPress={() => {
                  toast({
                    title: 'Saved 🥳',
                    content: 'Your notes have been saved',
                    variant: 'success',
                  });
                  setIsEditing(false);
                }}
                className="min-w-fit"
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
