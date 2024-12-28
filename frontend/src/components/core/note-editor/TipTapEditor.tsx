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
  Pencil2Icon,
  FileTextIcon,
  MagicWandIcon,
  CameraIcon,
} from '@radix-ui/react-icons';
import { twJoin } from 'tailwind-merge';
import { FileTrigger } from 'react-aria-components';
import { Markdown } from 'tiptap-markdown';

// Components
import { Button } from '@/components/ui/Button';
import { HeaderEditText } from '@/components/core/note-editor/HeaderEditText';
import { DialogQuizz } from '@/components/core/note-editor/DialogQuizz';

// Store
import { useToastStore } from '@/store/useToastStore';

// Libs
import { plus_jakarta_sans } from '@/libs/fonts';
import { LikeComponent } from '@/components/ui/LikeComponent';

export const TipTapEditor = () => {
  const toast = useToastStore((state) => state.setToast);

  const [isEditing, setIsEditing] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CodeBlock,
      HorizontalRule,
      Image,
      Markdown,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editable: isEditing,
    content: '<h1>Hello world<h1/>',
  });

  // Getting notes
  const getNotes = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    console.log(formData);
    try {
      const res = await fetch('http://localhost:4000/image-note', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      editor?.commands.insertContent(data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Sentence completion
  const completeSentence = async () => {
    const context = editor?.getText();

    try {
      const response = await fetch('http://localhost:4000/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context }),
      });

      const data = await response.json();
      editor?.commands.insertContent(data);
    } catch (error) {
      console.error('Failed to complete sentence:', error);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        await completeSentence();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  // Setting the editor to be editable
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
        <div className="absolute right-6 top-6 z-10 rounded-lg bg-gray-100 p-2">
          {!isEditing ? (
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
          ) : (
            <Button
              variant="solid"
              rounded="full"
              iconLeft={<MagicWandIcon className="size-5" />}
              className="font-medium"
              onPress={() => {
                toast({
                  title: 'Editing 🤔',
                  content: 'Your have entered editing mode',
                  variant: 'information',
                });
                setIsEditing(true);
              }}
            >
              Generate content
            </Button>
          )}
        </div>

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
              <LikeComponent
                hasBeenLiked={false}
                numberOfLikes={330}
                size="lg"
                action={() => {
                  console.log('Liked');
                }}
              />

              <DialogQuizz>
                <Button rounded="full" colorScheme="black" variant="outline">
                  🪄 Quizz yourself
                </Button>
              </DialogQuizz>
            </>
          ) : (
            <>
              <FileTrigger
                acceptedFileTypes={['.jpg,', '.jpeg', '.png']}
                onSelect={(event) => {
                  event && getNotes(Array.from(event)[0]);
                }}
              >
                <Button
                  colorScheme="light-blue"
                  rounded="full"
                  className="min-w-fit"
                  iconLeft={<CameraIcon className="size-5" />}
                >
                  Get notes from image
                </Button>
              </FileTrigger>
              <p className="hidden text-md text-gray-500 lg:block">
                Quick sentence complete : ctrl + /
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
