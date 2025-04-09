'use client';

// External packagess
import * as React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import CodeBlock from '@tiptap/extension-code-block';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import ImageResize from 'tiptap-extension-resize-image';
import Image from '@tiptap/extension-image';
import { Pencil2Icon, FileTextIcon } from '@radix-ui/react-icons';
import { twJoin } from 'tailwind-merge';
import { Markdown } from 'tiptap-markdown';
import { useSession } from 'next-auth/react';
import { useNavigationGuard } from 'next-navigation-guard';

// Components
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/note-editor/Header';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useCompleteSentence } from '@/hooks/note-editor/useCompleteSentence';
import { useSaveDocument } from '@/hooks/note-editor/useSaveDocument';

// Store
import { useToastStore } from '@/store/useToastStore';
import { ActionBar } from './ActionBar';

export const TipTapEditor: React.FC<{
  title: string;
  content: string | null;
  author: string;
  creatorId: number;
  noteId: number;
  isLiked: number; // Boolean from db is represented in 0 or 1
  likeCount: number;
}> = ({ title, content, author, creatorId, noteId, isLiked, likeCount }) => {
  const user = useSession();

  const allowEditing = React.useMemo(
    () => user.data?.user.id === creatorId,
    [user, creatorId]
  );

  const toast = useToastStore((state) => state.setToast);
  const [isEditing, setIsEditing] = React.useState(false);

  // Editor config
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      CodeBlock,
      HorizontalRule,
      Image,
      Markdown,
      Subscript,
      Superscript,
      ImageResize,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editable: isEditing,
    content: `${!content ? `<h1>${title}<h1/>` : ''}${content || ''}`, // Have to put emptry string instead of && because it puts false to string
  });

  // Sentence completion
  const completionLoading = useCompleteSentence({ isEditing, editor: editor! });

  // Saving document
  const { loadingSaveDocument, saveDocument } = useSaveDocument({
    noteId,
    setIsEditing,
    editor,
  });

  // Protection from not saving the note, only active when editor is setted to true. Look in page.tsx file in note-editor/[note-id]
  const navGuard = useNavigationGuard({
    enabled: isEditing,
    confirm: () =>
      window.confirm(
        'You have unsaved changes that will be lost. Do you really want to exit?'
      ),
  });

  if (editor === null) return;
  return (
    <>
      <Header
        title={title}
        author={author}
        editor={editor}
        isEditing={isEditing}
      />
      <div
        className={twJoin(
          'relative mt-4 flex h-full flex-col overflow-hidden rounded-lg border border-blue-900 p-4 pt-6 lg:p-8 lg:pb-6 2xl:mt-8',
          isEditing
            ? 'animate-text-editor-editing'
            : 'animate-text-editor-initial-apperance'
        )}
      >
        <div className="absolute right-6 top-6 z-10 rounded-lg bg-gray-100 p-2">
          {allowEditing &&
            (!isEditing ? (
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
                onPress={saveDocument}
                iconLeft={<FileTextIcon className="size-5" />}
                iconRight={loadingSaveDocument && <Spinner />}
                className="hidden font-medium md:flex"
              >
                Save
              </Button>
            ))}
        </div>

        <div className="prose h-full !max-w-none !overflow-scroll scroll-smooth">
          <EditorContent
            editor={editor}
            disabled={isEditing}
            className="text-editor"
          />
        </div>
        <ActionBar
          noteId={noteId}
          isLiked={isLiked}
          likeCount={likeCount}
          editor={editor}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          completionLoading={completionLoading}
          allowEditing={allowEditing}
        />
      </div>
    </>
  );
};
