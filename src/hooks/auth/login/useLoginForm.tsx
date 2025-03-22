'use client';

// External packages
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// Store
import { useToastStore } from '@/store/useToastStore';

export const useLoginForm = (): {
  loading: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
} => {
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toast = useToastStore((state) => state.setToast);
  const router = useRouter();

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok) {
        toast({
          title: 'Login failed',
          content: 'Please check your credentials and try again.',
          variant: 'error',
        });
        return;
      }

      toast({
        title: 'Success',
        content: 'You have successfully logged in 🎉',
        variant: 'success',
      });

      router.replace('/home/subjects');
    } catch (error) {
      toast({
        title: 'Error',
        content: 'Something went wrong. Please try again.',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setEmail,
    setPassword,
    loginUser,
  };
};
