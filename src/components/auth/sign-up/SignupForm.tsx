'use client';

// External packages
import * as React from 'react';
import { Form as AriaForm } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useSignup } from '@/hooks/auth/sign-up/useSignupForm';

export const SignupForm = () => {
  const { setUsername, setEmail, setPassword, signupUser, loading } =
    useSignup();

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
        type="password"
        isPassword
        label="Password"
        size="lg"
        inputProps={{
          placeholder: '********',
        }}
        onChange={(val) => setPassword(val.toString())}
        minLength={8}
        maxLength={16}
      />
      <Button
        rounded="none"
        size="lg"
        type="submit"
        iconRight={loading && <Spinner />}
      >
        Sign up
      </Button>
      {/* 
        Placeholder for future OAuth providers (future)
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
