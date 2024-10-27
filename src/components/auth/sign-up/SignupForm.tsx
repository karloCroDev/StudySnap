'use client';

// External packages
import * as React from 'react';
import { Form as AriaForm } from 'react-aria-components';
import { FaGoogle } from 'react-icons/fa';

// Components
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { Divider } from '@/components/global/Divider';

export const SignupForm = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  console.log(username, email, password);
  return (
    <AriaForm className="mt-4 flex flex-col gap-y-8 md:gap-y-6 2xl:mt-8">
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
      <Button colorScheme="light-blue" rounded="none" type="submit" size="lg">
        Sign up
      </Button>
      {/* <Divider />
      <Button
        variant="outline"
        rounded="none"
        colorScheme="black"
        size="lg"
        iconLeft={<FaGoogle className="text-blue-900" />}
      >
        Sign up with Google
      </Button> */}
    </AriaForm>
  );
};
