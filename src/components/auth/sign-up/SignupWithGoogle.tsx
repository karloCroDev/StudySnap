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
import { FaGoogle } from 'react-icons/fa';

export const SignupWithGoogle = () => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const toast = useToastStore((state) => state.setToast);

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      await signIn('google')

      toast({
        title: `Welcome to StudySnap`,
        content: "Success",
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
    <div>
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
        iconLeft={<FaGoogle className="text-blue-900" />}
        onClick={()=>signIn('google')}
      >
        Sign up with Google
      </Button>
    </div>
  );
};
