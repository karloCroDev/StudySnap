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
import { DialogGenerateContent } from './DialogGenerateContent';
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';

// Libs
import { plus_jakarta_sans } from '@/lib/fonts';
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

  const [loading, setLoading] = React.useState(false);

  // Getting notes
  const getNotesFromImage = async (image: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', image);
      const response = await fetch('http://localhost:3000/api/ai/image-note', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        editor?.commands.insertContent(data);
        toast({
          title: 'Notes genearted',
          content: 'Notes generated successfully from your image',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'Failed to get notes',
        content: 'Please try again later, problem with server',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Sentence completion
  const completeSentence = async () => {
    const context = editor?.getText();

    try {
      const response = await fetch('http://localhost:3000/api/ai/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context }),
      });

      const data = await response.json();
      if (response.ok) editor?.commands.insertContent(data);
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
        <div className="flex animate-header-initial-apperance items-center justify-between px-2">
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
          'relative mt-4 flex h-full flex-col overflow-hidden rounded-3xl border border-blue-900 p-8 pb-6 2xl:mt-8',
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
              className="hidden md:flex"
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="outline"
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
              className="hidden font-medium md:flex"
            >
              Save
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
              <Button
                colorScheme="light-blue"
                variant="solid"
                iconRight={<Pencil2Icon className="size-5" />}
                rounded="full"
                onPress={() => {
                  toast({
                    title: 'Editing 🤔',
                    content: 'Your have entered editing mode',
                    variant: 'information',
                  });
                  setIsEditing(true);
                }}
                className="min-w-fit md:hidden"
              >
                Edit
              </Button>
              <DialogQuizz editor={editor} />
            </>
          ) : (
            <>
              <Button
                variant="outline"
                colorScheme="white"
                rounded="full"
                iconLeft={<FileTextIcon className="size-5" />}
                onPress={() => {
                  toast({
                    title: 'Saved 🥳',
                    content: 'Your notes have been saved',
                    variant: 'success',
                  });
                  setIsEditing(false);
                }}
                className="min-w-fit md:hidden"
              >
                Save
              </Button>
              <FileTrigger
                acceptedFileTypes={['.jpg,', '.jpeg', '.png']}
                onSelect={(event) => {
                  event && getNotesFromImage(Array.from(event)[0]);
                }}
              >
                <Button
                  colorScheme="light-blue"
                  rounded="full"
                  className="min-w-fit"
                  iconLeft={<CameraIcon className="size-5" />}
                  iconRight={loading && <Spinner />}
                >
                  Notes from image
                </Button>
              </FileTrigger>
              <p className="hidden text-balance text-md text-gray-500 lg:block">
                Sentence complete : ctrl + /
              </p>
              <DialogGenerateContent editor={editor} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
