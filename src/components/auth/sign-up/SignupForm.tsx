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
  console.log(username, email, password);
  const router = useRouter();
  const toast = useToastStore((state) => state.setToast);

  const signupUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Logged in',
      content: 'You have successfully logged in 😃',
      variant: 'success',
    });
    router.push('/home/subjects');
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
          onChange: (e) => setEmail(e.target.value), // note: Could pass directly but it is getting in conflict with div
        }}
      />
      <Input
        isRequired
        type="email"
        label="Email"
        size="lg"
        inputProps={{
          placeholder: 'Enter your email',
          onChange: (e) => setEmail(e.target.value), // note: Could pass directly but it is getting in conflict with div
        }}
      />
      <Input
        isRequired
        label="Password"
        size="lg"
        type="password"
        inputProps={{
          placeholder: '********',
          onChange: (e) => setPassword(e.target.value),
        }}
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
