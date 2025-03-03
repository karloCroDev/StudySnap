'use client';

// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Form as AriaForm } from 'react-aria-components';
import { signIn } from 'next-auth/react';

// Components
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

// Store
import { useToastStore } from '@/store/useToastStore';

export const SignupForm = () => {
  const [loading, setLoading] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();
  const toast = useToastStore((state) => state.setToast);

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Uhoh something went wrong',
          content: data.statusText,
          variant: 'error',
        });
        return;
      }
      // Immediatelly signning in, after sign up
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      toast({
        title: `Welcome ${username} to StudySnap`,
        content: data.statusText,
        variant: 'success',
      });
      router.push('/home/subjects');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Uhoh, something went wrong',
        content:
          'Please make sure you have entered all the credentials correctly and try again',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
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
