// External packages
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Logo } from '@/components/ui/Logo';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { LoginForm } from '@/components/auth/login/LoginForm';

// Metadata
export const metadata: Metadata = {
  title: 'Log in',
  description:
    'Quick, log in to StudySnap! The faster you fill up, the closer you will be to a revolutionary way of handling studies',
  openGraph: {
    title: 'Log in',
    description:
      'Quick, log in to StudySnap! The faster you fill up, the closer you will be to a revolutionary way of handling studies',
    siteName: 'StudySnap',
    images: {
      url: '/images/favicon-logo.png',
    },
  },
};

export default function Login() {
  return (
    <Layout>
      <LayoutRow className="h-screen flex-col flex-nowrap">
        <Logo className="mt-5 2xl:mt-10" href="/login" />
        <LayoutColumn
          lgOffset={1}
          lg={4}
          className="flex flex-1 animate-auth-page items-center"
        >
          <div className="w-full pb-6">
            <h1 className="text-2xl font-bold sm:text-3xl xl:text-4xl">
              Welcome back!
            </h1>
            <p className="mt-4 text-sm text-gray-400 xl:text-base">
              The faster you fill up, the closer you will be to a revolutionary
              way of handling studies
            </p>
            <LoginForm />
            <p className="mt-4 text-gray-400 xl:mt-12">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="font-semibold text-gray-900 underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </LayoutColumn>
        <div className="absolute bottom-0 right-0 hidden h-screen w-1/2 lg:block">
          <Image
            src="/images/login-image.png"
            alt="Login thumbnail"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </LayoutRow>
    </Layout>
  );
}
