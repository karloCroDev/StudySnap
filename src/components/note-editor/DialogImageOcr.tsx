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
import { Editor as EditorType } from '@tiptap/react';
import {
  MagicWandIcon,
  CameraIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useToastStore } from '@/store/useToastStore';
import { Spinner } from '@/components/ui/Spinner';

export const DialogImageOcr: React.FC<{
  editor: EditorType;
}> = ({ editor }) => {
  const toast = useToastStore((state) => state.setToast);

  const [isOpen, setIsOpen] = React.useState(false);

  const [prompt, setPrompt] = React.useState('');
  const [image, setImage] = React.useState<null | File>(null);
  const clientImage = React.useMemo(
    () => image && URL.createObjectURL(image),
    [image]
  );

  const [loading, setLoading] = React.useState(false);

  const getNotesFromImage = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('file', image!);
      const response = await fetch('http://localhost:3000/api/ai/image-note', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        toast({
          title: 'Failed to get notes',
          content: data, // This data is status text
          variant: 'error',
        });
        return;
      }
      editor?.commands.insertContent(data);
      toast({
        title: 'Notes genearted',
        content: 'Notes generated successfully from your image',
        variant: 'success',
      });
      setPrompt('');
      setImage(null);
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: 'Failed to get notes',
        content: 'Please try again later, problem with server',
        variant: 'error',
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Image OCR"
      triggerProps={{
        children: (
          <Button
            colorScheme="light-blue"
            rounded="full"
            className="min-w-fit"
            iconLeft={<CameraIcon className="size-5" />}
            iconRight={loading && <Spinner />}
            onPressStart={() => setIsOpen(true)}
          >
            Analyse Image
          </Button>
        ),
        asChild: true,
      }}
    >
      <Form
        className="flex flex-col"
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
          <FileTrigger
            acceptedFileTypes={['.jpg,', '.jpeg', '.png']}
            onSelect={(event) => {
              event && setImage(Array.from(event)[0]);
            }}
          >
            <AriaButton className="my-4 flex h-64 w-full cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-dashed border-blue-400">
              {clientImage ? (
                <Image
                  className="h-full w-full object-cover"
                  alt="Image to analyse"
                  src={clientImage}
                  width={10}
                  height={10}
                />
              ) : (
                <div className="flex items-center gap-4 text-gray-400">
                  <p className="text-lg">Add image </p>
                  <PlusCircledIcon className="size-8" />
                </div>
              )}
            </AriaButton>
          </FileTrigger>
        </DropZone>
        <Button
          type="submit"
          isDisabled={!prompt && !image}
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
