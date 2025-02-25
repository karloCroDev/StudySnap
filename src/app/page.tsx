// note: Create landing page if we have time

'use client';
// External packages
import { Form, DropZone } from 'react-aria-components';
import { DialogClose } from '@radix-ui/react-dialog';
import * as React from 'react';
import Image from 'next/image';
// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dialog } from '@/components/ui/Dialog';
import { Search } from '@/components/ui/Search';

// Store
import { useToastStore } from '@/store/useToastStore';

export default function Home() {
  const toast = useToastStore((state) => state.setToast);
  const [image, setImage] = React.useState<File | null>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [filledSrc, setFilledSrc] = React.useState('');

  return (
    <Layout>
      <div className="flex flex-col gap-4 p-6">
        <Logo />
        <Button variant="outline" colorScheme="black" className="flex-grow-[1]">
          Hello world
        </Button>
        <Button variant="outline" className="min-w-[6rem] flex-grow-0">
          A
        </Button>
        <Form className="flex flex-col gap-5">
          <Input
            isRequired
            type="email"
            name="email"
            label="Username"
            size="lg"
            className="mt-20"
            inputProps={{
              placeholder: 'Enter your username',
            }}
          />
          <Button>Submit</Button>
        </Form>
      </div>
      <Button variant="outline" size="lg">
        a
      </Button>
      <Dialog
        triggerProps={{
          children: <Button>H</Button>,
          asChild: true,
        }}
        title="Hello world"
      >
        <h3>Dialog</h3>
      </Dialog>

      <Button
        onPress={() =>
          toast({
            title: 'Test',
            content: 'Please restart moments',
            variant: 'error',
          })
        }
      >
        Click me
      </Button>
      <Search placeholderLabel="Search" className="mt-10" />

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        triggerProps={{
          children: (
            <Button className="mt-10" onPress={() => setIsOpen(true)}>
              Open modal
            </Button>
          ),
          asChild: true,
        }}
        title="Cool man"
      >
        <div>
          <Input
            isMdHorizontal
            label="Username"
            inputProps={{
              placeholder: 'Hello world',
            }}
          />
          <Input
            className="mt-6"
            label="Details (optional)"
            isMdHorizontal
            inputProps={{
              placeholder: 'Live like and subscribe',
            }}
          />
        </div>
        <Button onPress={() => setIsOpen(false)}>Finish the task </Button>
      </Dialog>
      <Button colorScheme="light-blue" isDisabled>
        sss
      </Button>

      <DropZone
        className="relative"
        getDropOperation={(types) =>
          types.has('image/png') || types.has('image/jpeg') ? 'copy' : 'cancel'
        }
        onDrop={async (e) => {
          e.items.find(async (item) => {
            if (
              item.kind === 'file' &&
              (item.type === 'image/jpeg' ||
                item.type === 'image/png' ||
                item.type === 'image/jpg')
            )
              setFilledSrc(URL.createObjectURL(await item.getFile()));
          });
        }}
      >
        {filledSrc ? (
          <Image
            className="object-contain"
            alt="Image to analyse"
            src={filledSrc}
            fill
          />
        ) : (
          <div className="size-40 rounded border border-dashed border-blue-400">
            Drop image
          </div>
        )}
      </DropZone>

      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="hidden"
          id="cameraInput"
        />
        <label
          htmlFor="cameraInput"
          className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Take a Picture
        </label>

        {image && (
          <Image
            src={URL.createObjectURL(image)}
            width={100}
            height={100}
            alt="Captured"
            className="mt-4 rounded-lg object-cover"
          />
        )}
      </div>
      <Form>
        <Button type="reset">dwqpdpwqkd</Button>
      </Form>
      <Image src="/images/FaviconLogo.png" alt="df" width={500} height={500} />
    </Layout>
  );
}
