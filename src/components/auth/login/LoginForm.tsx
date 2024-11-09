'use client';

// External packages
import * as React from 'react';
import { Form as AriaForm } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  console.log(email, password);
  return (
    <AriaForm className="mt-4 flex flex-col gap-y-8 md:gap-y-6 2xl:mt-8">
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
      <Button colorScheme="light-blue" rounded="none" size="lg" type="submit">
        Log in
      </Button>
      {/* 

       <div className="flex items-center gap-6">
      <hr className="h-px w-full border-0 bg-grayscale-900" />
      <p className="text-sm font-semibold">or</p>
      <hr className="h-px w-full border-0 bg-grayscale-900" />
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
