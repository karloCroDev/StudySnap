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

import Image from '@tiptap/extension-image';
import { Pencil2Icon, FileTextIcon } from '@radix-ui/react-icons';
import { twJoin } from 'tailwind-merge';
import { Markdown } from 'tiptap-markdown';
import { useSession } from 'next-auth/react';

// Components
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/note-editor/Header';
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';
import { ActionBar } from './ActionBar';
import { useNavigationGuard } from 'next-navigation-guard';

export const TipTapEditor: React.FC<{
  creatorId: string; // NOT OPTIONAL
  title: string;
  content: string;
  noteId: string;
}> = ({ creatorId, title, content, noteId }) => {
  const user = useSession();

  const toast = useToastStore((state) => state.setToast);

  const [isEditing, setIsEditing] = React.useState(false);

  console.log('Logged in user:', user.data?.user.id);
  console.log('Creator id:', creatorId);
  console.log('Note id:', noteId);

  // Editor config
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CodeBlock,
      HorizontalRule,
      Image,
      Markdown,
      Subscript,
      Superscript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editable: isEditing,
    content: `${!content ? `<h1>${title}<h1/>` : ''}${content}`, // Have to put emptry string instead of && because it puts false to string
  });

  // Sentence completion
  const [completionLoading, setCompletionLoading] = React.useState(false);
  const completeSentence = async () => {
    const context = editor?.getText();

    try {
      setCompletionLoading(true);
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
    } finally {
      setCompletionLoading(false);
    }
  };
  // Autocompletion
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

  // Saving document
  const [loadingSaveDocument, setLoadingSaveDocument] = React.useState(false);

  const saveDocument = async () => {
    try {
      setLoadingSaveDocument(true);
      console.log(editor);
      const response = await fetch(
        'http://localhost:3000/api/core/note-editor',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content: editor?.getHTML(),
            id: noteId,
          }), // Luka: Title provided because it is put request, if this irritates you change it to patch
        }
      );
      if (!response.ok) {
        toast({
          title: 'Problem with getting data',
          content: 'Problem with getting data, please try again!',
          variant: 'error',
        });
        return;
      }
      toast({
        title: 'Saved 🥳',
        content: 'Your notes have been saved',
        variant: 'success',
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Problem with getting data',
        content: 'Problem with getting data, please try again!',
        variant: 'error',
      });
    } finally {
      setLoadingSaveDocument(false);
    }
  };

  // Protection from not saving the note
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
        author="ANA HORVAT"
        editor={editor}
        isEditing={isEditing}
      />
      <div
        className={twJoin(
          'relative mt-4 flex h-full flex-col overflow-hidden rounded-lg border border-blue-900 p-8 pb-6 2xl:mt-8',
          isEditing
            ? 'animate-text-editor-editing'
            : 'animate-text-editor-initial-apperance'
        )}
      >
        <div className="absolute right-6 top-6 z-10 rounded-lg bg-gray-100 p-2">
          {true ? (
            !isEditing ? (
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
            )
          ) : null}
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
          editor={editor}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          saveDocument={saveDocument}
          completionLoading={completionLoading}
        />
        {/* <div className={navGuard.active ? 'block' : 'hidden'}>
          <p onClick={() => navGuard.reject}>no</p>
          <p onClick={() => navGuard.reject}>yes</p>
        </div> */}
      </div>
    </>
  );
};
