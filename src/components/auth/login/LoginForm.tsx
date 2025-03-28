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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { loading, loginUser } = useLoginForm({ email, password });
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
    </AriaForm>
  );
};
