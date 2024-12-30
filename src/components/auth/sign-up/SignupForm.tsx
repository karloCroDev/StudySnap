'use client';

// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Form as AriaForm } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Store
import { useToastStore } from '@/store/useToastStore';

export const SignupForm = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();
  const toast = useToastStore((state) => state.setToast);

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseUserExists = await fetch('/api/auth/user-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const dataUser = await responseUserExists.json();

      if (dataUser) {
        toast({
          title: 'User already exists',
          content:
            'The user with this email already exists. Please try again with a different email',
          variant: 'error',
        });
        return;
      }
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast({
          title: 'Signed up',
          content: 'You have successfully signed up. Welcome 😃!',
          variant: 'success',
        });
        router.push('/home/subjects');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content:
          'Please make sure you have entered all the credentials correctly and try again',
        variant: 'error',
      });
    }

    //Catch
    // toast({
    //   title: 'Uhoh, something went wrong',
    //   content:
    //     'Please make sure you have entered all the credentials correctly and try again 😢',
    //   variant: 'error',
    // });
  };

  return (
    <AriaForm
      className="mt-4 flex flex-col gap-y-8 md:gap-y-6 2xl:mt-8"
      onSubmit={signupUser}
    >
      <Input
        isRequired
        type="text"
        label="Username"
        size="lg"
        inputProps={{
          placeholder: 'Enter your username',
        }}
        onChange={(val) => setUsername(val.toString())}
      />
      <Input
        isRequired
        type="email"
        label="Email"
        size="lg"
        inputProps={{
          placeholder: 'Enter your email',
        }}
        onChange={(val) => setEmail(val.toString())}
        minLength={3}
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
        minLength={8}
        maxLength={16}
      />
      <Button rounded="none" size="lg" type="submit">
        Sign up
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
        Sign up with Google
      </Button> */}
    </AriaForm>
  );
};
