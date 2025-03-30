'use client';

// External packages
import * as React from 'react';
import {
  TextField,
  FieldError,
  DropZone,
  Input,
  FileTrigger,
  Button as AriaButton,
  Form,
} from 'react-aria-components';
import { type Editor as EditorType } from '@tiptap/react';
import {
  UploadIcon,
  CrossCircledIcon,
  FileTextIcon,
  FilePlusIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useClientImage } from '@/hooks/useClientImage';
import { useAnalyseAI } from '@/hooks/note-editor/useImageOcr';

// Dialog for asking AI information about the image, and also ability to deteect text from image and then analyse it
export const DialogAnalyseAI: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [prompt, setPrompt] = React.useState('');
  const [image, setImage] = React.useState<null | File>(null);
  const [pdf, setPdf] = React.useState<null | File>(null);

  const { getNotesFromImage, loading } = useAnalyseAI({
    editor,
    setIsOpen,
    image,
    pdf,
    prompt,
    setImage,
    setPdf,
    setPrompt,
  });
  const clientImage = useClientImage(image!);

  console.log(pdf);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Analyse Image or PDF"
      triggerProps={{
        children: (
          <>
            <Button
              colorScheme="light-blue"
              rounded="full"
              className="min-w-fit"
              iconLeft={<FilePlusIcon className="size-5" />}
              iconRight={loading && <Spinner />}
              onPress={() => setIsOpen(true)}
            >
              Analyse Image or PDF
            </Button>
          </>
        ),
        asChild: true,
      }}
    >
      <Form className="flex flex-col gap-4" onSubmit={getNotesFromImage}>
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
            types.has('image/png') ||
            types.has('image/jpeg') ||
            types.has('image/jpg')
              ? 'copy'
              : 'cancel'
          }
          onDrop={async (e) => {
            e.items.find(async (item) => {
              if (item.kind === 'file') {
                if (
                  item.type === 'image/jpeg' ||
                  item.type === 'image/png' ||
                  item.type === 'image/jpg'
                ) {
                  setImage(await item.getFile());
                  setPdf(null);
                }
                if (item.type === 'application/pdf') {
                  setPdf(await item.getFile());
                  setImage(null);
                }
              }
            });
          }}
        >
          {clientImage ||
            (pdf && (
              <AriaButton
                className="absolute right-4 top-4 z-[999999] text-blue-400"
                onPress={() => {
                  setPdf(null);
                  setImage(null);
                }}
              >
                <CrossCircledIcon className="size-8" />
              </AriaButton>
            ))}

          <FileTrigger
            acceptedFileTypes={['.jpg,', '.jpeg', '.png', '.pdf']} // Users can access camera snapshot or select images from their phone, it is already built into this component
            onSelect={(event) => {
              if (!event) return;
              const file = Array.from(event)[0];

              if (file.type === 'application/pdf') {
                setPdf(file); // Set the file as PDF
                setImage(null);
              } else {
                setImage(file); // Set the file as an image
                setPdf(null);
              }
            }}
          >
            <AriaButton className="flex h-64 w-full cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-dashed border-blue-400">
              {clientImage && (
                <Image
                  className="h-full w-full rounded object-cover"
                  alt="Image to analyse"
                  src={clientImage}
                  fill
                />
              )}{' '}
              {pdf && (
                <div className="font-medium">
                  <div className="flex items-center gap-3 text-md text-gray-400">
                    <FileTextIcon className="size-6" />
                    <p>Your currently selected pdf:</p>
                  </div>
                  <p className="text-lg text-blue-900">{pdf.name}</p>
                </div>
              )}
              {!pdf && !clientImage && (
                <div className="flex items-center gap-4 text-gray-400">
                  <p className="text-lg">Add Image or PDF </p>
                  <UploadIcon className="size-8" />
                </div>
              )}
            </AriaButton>
          </FileTrigger>
        </DropZone>
        <Button
          type="submit"
          isDisabled={!prompt || (!image && !pdf)} // User is not able to send request if he hasn't wrote anything and hasn't created a prompt
          iconLeft={<FilePlusIcon className="size-5" />}
          iconRight={loading && <Spinner />}
          className="mt-2 self-end"
        >
          Analyse
        </Button>
      </Form>
    </Dialog>
  );
};
