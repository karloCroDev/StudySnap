'use client';

// External packages
import * as React from 'react';
import {
  TextField,
  FieldError,
  TextArea,
  DropZone,
  Input,
  FileTrigger,
  Button as AriaButton,
  Form,
} from 'react-aria-components';
import { type Editor as EditorType } from '@tiptap/react';
import {
  CameraIcon,
  UploadIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useToastStore } from '@/store/useToastStore';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useUploadImage } from '@/hooks/note-editor/useUploadImage';
import { useClientImage } from '@/hooks/useClientImage';
import { useImageOcr } from '@/hooks/note-editor/useImageOcr';

// Dialog for asking AI information about the image, and also ability to deteect text from image and then analyse it
export const DialogImageOcr: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const toast = useToastStore((state) => state.setToast);

  const [isOpen, setIsOpen] = React.useState(false);

  const [prompt, setPrompt] = React.useState('');

  const [image, setImage] = React.useState<null | File>(null);
  const clientImage = useClientImage(image!);

  const { getNotesFromImage, loading } = useImageOcr({
    setImage,
    image,
    editor,
    setIsOpen,
  });
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Image OCR"
      triggerProps={{
        children: (
          <>
            <Button
              colorScheme="light-blue"
              rounded="full"
              className="min-w-fit"
              iconLeft={<CameraIcon className="size-5" />}
              iconRight={loading && <Spinner />}
              onPress={() => setIsOpen(true)}
            >
              Analyse Image
            </Button>
          </>
        ),
        asChild: true,
      }}
    >
      <Form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          getNotesFromImage();
        }}
      >
        <TextField
          isRequired
          minLength={5}
          className="outline-none"
          onChange={(val) => setPrompt(val.toString())}
          value={prompt}
        >
          <Input
            className="h-12 w-full rounded border-2 border-blue-900 p-2 focus:border-blue-900"
            placeholder="Enter a prompt for image.."
          />
          <FieldError className="!mt-2 text-red-400" />
        </TextField>
        <DropZone
          className="relative"
          getDropOperation={(types) =>
            types.has('image/png') || types.has('image/jpeg')
              ? 'copy'
              : 'cancel'
          }
          onDrop={async (e) => {
            e.items.find(async (item) => {
              if (
                item.kind === 'file' &&
                (item.type === 'image/jpeg' ||
                  item.type === 'image/png' ||
                  item.type === 'image/jpg')
              )
                setImage(await item.getFile());
            });
          }}
        >
          {clientImage && (
            <AriaButton
              className="absolute right-4 top-4 z-[999999] text-gray-50"
              onPress={() => setImage(null)}
            >
              <CrossCircledIcon className="size-8" />
            </AriaButton>
          )}

          <FileTrigger
            acceptedFileTypes={['.jpg,', '.jpeg', '.png']} // Users can access camera snapshot or select images from their phone, it is already built into this component
            onSelect={(event) => {
              event && setImage(Array.from(event)[0]);
            }}
          >
            <AriaButton className="flex h-64 w-full cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-dashed border-blue-400">
              {clientImage ? (
                <Image
                  className="h-full w-full object-cover"
                  alt="Image to analyse"
                  src={clientImage}
                  fill
                />
              ) : (
                <div className="flex items-center gap-4 text-gray-400">
                  <p className="text-lg">Add image </p>
                  <UploadIcon className="size-8" />
                </div>
              )}
            </AriaButton>
          </FileTrigger>
        </DropZone>
        <Button
          type="submit"
          isDisabled={!prompt || !image} // User is not able to send request if he hasn't wrote anything and hasn't created a prompt
          iconLeft={<CameraIcon className="size-5" />}
          iconRight={loading && <Spinner />}
          className="mt-2 self-end"
        >
          Analyse
        </Button>
      </Form>
    </Dialog>
  );
};
