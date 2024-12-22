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
import { HeartIcon, HeartFilledIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { twJoin, twMerge } from 'tailwind-merge';

// Components
import { Button } from '@/components/ui/Button';
import { HeaderEditText } from '@/components/core/note-editor/HeaderEditText';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';

export const TipTapEditor = () => {
  const [isEditing, setIsEditing] = React.useState(false);

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
        <div className="flex items-center justify-between">
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

      <div className="relative mt-8 flex h-full flex-col overflow-hidden rounded-3xl border border-blue-900 p-8">
        {!isEditing && (
          <div className="absolute right-6 top-6 z-10 rounded-lg bg-gray-100 p-2">
            <Button
              colorScheme="light-blue"
              variant="solid"
              iconRight={<Pencil2Icon className="size-5" />}
              onPress={() => setIsEditing(true)}
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
        <div className="flex items-center justify-between pt-4">
          {!isEditing && (
            <>
              <div className="flex cursor-pointer items-center gap-2">
                <HeartIcon className="size-8" />
                <p
                  className={twMerge(
                    'text-md font-bold !italic',
                    plus_jakarta_sans.className
                  )}
                >
                  200
                </p>
              </div>
              <Button rounded="full" colorScheme="black" variant="outline">
                🪄 Quizz yourself
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
