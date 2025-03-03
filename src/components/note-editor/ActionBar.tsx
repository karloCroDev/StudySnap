'use client';

// External packagess
import * as React from 'react';
import { type Editor as EditorType } from '@tiptap/react';
import { useSession } from 'next-auth/react';

import { Pencil2Icon, FileTextIcon } from '@radix-ui/react-icons';

// Components
import { Button } from '@/components/ui/Button';
import { DialogQuizz } from '@/components/note-editor/DialogQuizz';
import { DialogGenerateContent } from './DialogGenerateContent';
import { Spinner } from '@/components/ui/Spinner';
import { LikeComponent } from '@/components/ui/LikeComponent';
import { DialogImageOcr } from '@/components/note-editor/DialogImageOcr';
import { DialogAskAI } from '@/components/note-editor/DialogAskAI';

// Store
import { useToastStore } from '@/store/useToastStore';

// Footer of the document for features, especially on mobile
export const ActionBar: React.FC<{
  noteId: string;
  isLiked: number;
  likeCount: number;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  saveDocument: () => void;
  editor: EditorType;
  completionLoading: boolean;
  allowEditing: boolean;
}> = ({
  noteId,
  isLiked,
  likeCount,
  isEditing,
  setIsEditing,
  editor,
  saveDocument,
  completionLoading,
  allowEditing,
}) => {
  const user = useSession();
  const toast = useToastStore((state) => state.setToast);
  console.log(noteId);
  return (
    <div className="flex items-center justify-between gap-4 overflow-scroll py-2">
      {!isEditing ? (
        <>
          <LikeComponent
            noteId={noteId}
            numberOfLikes={likeCount}
            hasBeenLiked={Boolean(isLiked)}
            size="lg"
          />
          {allowEditing && (
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
          )}
          <div className="flex gap-4">
            <DialogQuizz editor={editor} />
            <DialogAskAI editor={editor} />
          </div>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            colorScheme="white"
            rounded="full"
            iconLeft={<FileTextIcon className="size-5" />}
            onPress={saveDocument}
            className="min-w-fit md:hidden"
          >
            Save
          </Button>
          <DialogImageOcr editor={editor} />
          <div className="hidden items-center gap-4 text-balance text-md text-gray-500 lg:flex">
            <p className="italic">Sentence complete:</p>
            {completionLoading ? (
              <Spinner />
            ) : (
              <p className="font-semibold">ctrl + /</p>
            )}
          </div>
          <DialogGenerateContent editor={editor} />
        </>
      )}
    </div>
  );
};
