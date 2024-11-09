// note: Create landing page if we have time

'use client';
// External packages
import { Form } from 'react-aria-components';
import { DialogClose } from '@radix-ui/react-dialog';
import * as React from 'react';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dialog } from '@/components/ui/Dialog';
import { Search } from '@/components/ui/Search';
// import { Toast } from '@/components/Toast';

// Store
import { useToastStore } from '@/store/useToastStore';

export default function Home() {
  const toast = useToastStore((state) => state.setToast);

  const [isOpen, setIsOpen] = React.useState(false);
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
            className="mt-20 w-[500px]"
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
        footer={
          <DialogClose asChild>
            <Button className="self-start">Close</Button>
          </DialogClose>
        }
      >
        <h3>Dialog</h3>
      </Dialog>

      <Button
        onClick={() =>
          toast({
            title: 'Test',
            content: 'Please restart  moments',
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
          children: <Button className="mt-10">Open modal</Button>,
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
        <Button onClick={() => setIsOpen(false)}>Finish the task </Button>
      </Dialog>
    </Layout>
  );
}
