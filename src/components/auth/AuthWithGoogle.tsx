'use client';

// External packages
import * as React from 'react';
import { signIn } from 'next-auth/react';

// Components
import { Button } from '@/components/ui/Button';

// Store
import { FaGoogle } from 'react-icons/fa';

export const AuthWithGoogle: React.FC<{
  type: 'login' | 'sign-up';
}> = ({ type }) => {
  return (
    <>
      <div className="py-4">
        <div className="flex items-center gap-6">
          <hr className="h-px w-full border-0 bg-gray-900" />
          <p className="text-sm font-semibold">or</p>
          <hr className="h-px w-full border-0 bg-gray-900" />
        </div>
      </div>
      <Button
        variant="outline"
        rounded="none"
        colorScheme="black"
        size="lg"
        className="w-full text-md sm:text-lg"
        iconLeft={<FaGoogle className="text-blue-900" />}
        onPress={() => signIn('google')}
      >
        {type === 'login' ? 'Log in' : 'Sign up'} with Google
      </Button>
    </>
  );
};
