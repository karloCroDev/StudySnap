'use client';

// External packages
import * as React from 'react';
import {
  DropZone,
  FileTrigger,
  Form,
  Button as AriaButton,
} from 'react-aria-components';
import { Editor as EditorType } from '@tiptap/react';
import Image from 'next/image';
import { UploadIcon, CrossCircledIcon } from '@radix-ui/react-icons';

// Components
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

// Dialog for uploading image to document, or putting the url!
export const DialogUploadImage: React.FC<{
  children: React.ReactNode;
  editor: EditorType;
}> = ({ editor, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [image, setImage] = React.useState<null | File>(null);
  const clientImage = React.useMemo(
    () => image && URL.createObjectURL(image),
    [image]
  );

  const [loading, setLoading] = React.useState(false);

  const uploadUsersImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      if (image) formData.append('file', image); // Karlo: Add better insight while checking
      const response = await fetch(
        'http://localhost:3000/api/core/home/notes/editor-image-upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      editor.chain().focus().setImage({ src: data }).run();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to complete sentence:', error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Add image to document"
      triggerProps={{
        children,
      }}
    >
      <Form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          console.log('Something');
          if (image) uploadUsersImage(e);
          if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setIsOpen(false);
          }
        }}
      >
        <Input
          type="text"
          label="URL"
          isMdHorizontal
          inputProps={{
            placeholder: 'Enter image URL',
            className: 'md:w-full',
          }}
          onChange={(val) => setImageUrl(val.toString())}
          className="md:w-full"
          inputWrapperProps={{
            className: 'md:flex-1',
          }}
        />

        {/* Karlo: todo create component from this */}
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
            acceptedFileTypes={['.jpg,', '.jpeg', '.png']} // Users can access camera snapshot or select images from their phone
            onSelect={(event) => {
              event && setImage(Array.from(event)[0]);
            }}
          >
            <AriaButton className="relative flex h-64 w-full cursor-pointer items-center justify-center overflow-hidden rounded border-2 border-dashed border-blue-400">
              {clientImage ? (
                <Image
                  className="h-full w-full object-cover brightness-75"
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
          className="self-end"
          type="submit"
          iconRight={loading && <Spinner />}
          isDisabled={!!(image && imageUrl) || (!image && !imageUrl)} // There can't be an image and url, and atleast something must be completed in order to complete the dialog
        >
          Add image
        </Button>
      </Form>
    </Dialog>
  );
};
