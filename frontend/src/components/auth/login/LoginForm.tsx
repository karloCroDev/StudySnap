'use client';

// External packages
import * as React from 'react';
import { Form as AriaForm } from 'react-aria-components';
import { useRouter } from 'next/navigation';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Store
import { useToastStore } from '@/store/useToastStore';

export const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toast = useToastStore((state) => state.setToast);
  const router = useRouter();

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Logged in',
      content: 'You have successfully logged in 😃',
      variant: 'success',
    });
    router.push('/home/subjects');
  };
  //Catch
  // toast({
  //   title: 'Uhoh, something went wrong',
  //   content:
  //     'Please make sure you have entered all the credentials correctly and try again 😢',
  //   variant: 'error',
  // });

  return (
    <AriaForm
      className="mt-4 flex flex-col gap-y-8 md:gap-y-6 2xl:mt-8"
      onSubmit={loginUser}
    >
      <Input
        isRequired
        type="email"
        label="Email"
        size="lg"
        inputProps={{
          placeholder: 'Enter your email',
        }}
        onChange={(val) => setEmail(val.toString())}
      />
      <Input
        isRequired
        label="Password"
        size="lg"
        type="password"
        inputProps={{
          placeholder: '********',
        }}
        onChange={(val) => setPassword(val.toString())}
      />
      <Button colorScheme="light-blue" rounded="none" size="lg" type="submit">
        Log in
      </Button>
      {/* 

       <div className="flex items-center gap-6">
      <hr className="h-px w-full border-0 bg-gray-900" />
      <p className="text-sm font-semibold">or</p>
      <hr className="h-px w-full border-0 bg-gray-900" />
    </div>
      <Button
        variant="outline"
        rounded="none"
        colorScheme="black"
        size="lg"
        iconLeft={<FaGoogle className="text-blue-900" /> // Add image rather than icon}
      >
        Log in with Google
      </Button> */}
    </AriaForm>
  );
};