'use client';

// External packages
import * as React from 'react';
import { Form as AriaForm } from 'react-aria-components';
import { FaGoogle } from 'react-icons/fa';

// Components
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { Divider } from '@/components/global/Divider';

export const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  console.log(email, password);
  return (
    <AriaForm className="mt-4 flex flex-col gap-y-8 md:gap-y-6 2xl:mt-8">
      <Input
        label="Email"
        size="lg"
        inputProps={{
          placeholder: 'Enter your email',
          onChange: (e) => setEmail(e.target.value), // note: Could pass directly but it is getting in conflict with div
        }}
      />
      <Input
        label="Password"
        size="lg"
        type="password"
        inputProps={{
          placeholder: '********',
          onChange: (e) => setPassword(e.target.value),
        }}
      />
      <Button colorScheme="light-blue" rounded="none" size="lg">
        Log in
      </Button>
      {/* <Divider />
      <Button
        variant="outline"
        rounded="none"
        colorScheme="black"
        size="lg"
        iconLeft={<FaGoogle className="text-blue-900" />}
      >
        Log in with Google
      </Button> */}
    </AriaForm>
  );
};
