// note: Create landing page if we have time

'use client';
// External packages
import { Form } from 'react-aria-components';
import { DialogClose } from '@radix-ui/react-dialog';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/Layout';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Dialog } from '@/components/Dialog';
// import { Toast } from '@/components/Toast';

// Store
import { useToastStore } from '@/store/useToastStore';

export default function Home() {
  const toast = useToastStore((state) => state.setToast);
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
          children: <Button>Hello world</Button>,
          asChild: true,
        }}
        title="Hello world"
        footer={
          // fix: Currently created like this, but will need the better way of handling the request that will be sended to server
          <DialogClose asChild>
            <Button className="self-start">Close</Button>
          </DialogClose>
        }
      >
        <h3>Hello world</h3>
      </Dialog>

      <Button
        onClick={() =>
          toast({
            title: 'Test',
            content: 'Please restart  moments',
            type: 'error',
          })
        }
      >
        Click me
      </Button>
    </Layout>
  );
}
