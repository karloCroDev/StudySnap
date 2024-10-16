// note: Create landing page if we have time

'use client';
// External packages
import { Form } from 'react-aria-components';

// Components
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Layout, LayoutColumn, LayoutRow } from '@/components/Layout';

export default function Home() {
  return (
    <>
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
      <div></div>
    </>
  );
}
