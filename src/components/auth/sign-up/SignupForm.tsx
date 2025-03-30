'use client';

// External packages
import * as React from 'react';
import { Form as AriaForm } from 'react-aria-components';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Hooks
import { useSignupWithCredentials } from '@/hooks/auth/sign-up/useSignupWithCredentials';

export const SignupForm = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signupUser, loading } = useSignupWithCredentials({
    username,
    email,
    password,
  });

  return (
    <>
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
      </AriaForm>
    </>
  );
};
