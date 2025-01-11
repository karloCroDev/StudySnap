'use client';

// External packagess
import * as React from 'react';
import { Editor as EditorType } from '@tiptap/react';

import { Pencil2Icon, FileTextIcon, CameraIcon } from '@radix-ui/react-icons';
import { FileTrigger } from 'react-aria-components';

// Components
import { Button } from '@/components/ui/Button';
import { DialogQuizz } from '@/components/core/note-editor/DialogQuizz';
import { DialogGenerateContent } from './DialogGenerateContent';
import { Spinner } from '@/components/ui/Spinner';
import { LikeComponent } from '@/components/ui/LikeComponent';

// Store
import { useToastStore } from '@/store/useToastStore';

export const ActionBar: React.FC<{
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  editor: EditorType;
  completionLoading: boolean;
}> = ({ isEditing, setIsEditing, editor, completionLoading }) => {
  const toast = useToastStore((state) => state.setToast);

  // Getting notes
  const [loading, setLoading] = React.useState(false);

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
  return (
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
