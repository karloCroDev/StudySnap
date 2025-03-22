'use client';

// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useSignup = (): {
  loading: boolean;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  signupUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
} => {
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
  return {
    loading,
    setUsername,
    setEmail,
    setPassword,
    signupUser,
  };
};
