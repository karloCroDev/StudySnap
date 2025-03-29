'use client';

// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useSignupWithCredentials = ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const [loading, setLoading] = React.useState(false);

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

      if (!response.ok) {
        toast({
          title: 'Uhoh something went wrong',
          content: response.statusText,
          variant: 'error',
        });
        return;
      }
      console.log(response.ok);
      // Immediatelly signning in, after sign up
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      toast({
        title: `Welcome ${username} to StudySnap`,
        content: response.statusText,
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
    signupUser,
  };
};
