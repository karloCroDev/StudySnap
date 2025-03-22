'use client';

// External packages
import * as React from 'react';
import { Form as AriaForm } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useLoginForm } from '@/hooks/auth/login/useLoginForm';

export const LoginForm = () => {
  const { setEmail, setPassword, loading, loginUser } = useLoginForm();
  return (
    <AriaForm
      className="mt-4 flex flex-col gap-y-8 md:gap-y-6 2xl:mt-8"
      onSubmit={(e) => loginUser(e)}
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
        isPassword
        minLength={8}
        inputProps={{
          placeholder: '********',
        }}
        onChange={(val) => setPassword(val.toString())}
      />
      <Button
        colorScheme="light-blue"
        rounded="none"
        size="lg"
        type="submit"
        iconRight={loading && <Spinner />}
      >
        Log in
      </Button>
      {/* 
      Placeholdre for OAuth provider (future)
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
