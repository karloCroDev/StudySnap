// External packages
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Logo } from '@/components/ui/Logo';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { SignupForm } from '@/components/auth/sign-up/SignupForm';

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Welcome to StudySnap! The faster you fill up, the closer you will be to a revolutionary way of handling studies',
  openGraph: {
    title: 'Log in',
    description:
      'Welcome to StudySnap! The faster you fill up, the closer you will be to a revolutionary way of handling studies',
    siteName: 'StudySnap',
    images: {
      url: '/images/FaviconLogo.png',
    },
  },
};

export default function Signup() {
  return (
    <Layout>
      <LayoutRow className="h-screen flex-col flex-nowrap">
        <Logo className="mt-5 2xl:mt-10" />
        <LayoutColumn
          lgOffset={1}
          lg={4}
          className="flex flex-1 animate-auth-page items-center"
        >
          <div className="mt-12 w-full pb-6 2xl:mt-0">
            <h1 className="text-2xl font-bold sm:text-3xl xl:text-4xl">
              Let's get started!
            </h1>
            <p className="mt-4 text-sm text-gray-400 xl:text-base">
              The faster you fill up, the closer you will be to a revolutionary
              way of handling studies
            </p>
            <SignupForm />
            <p className="mt-4 text-gray-400 xl:mt-12">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-gray-900 underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </LayoutColumn>
        {/* note: Hacky way of doing this, but want to pursue the layout in the app */}
        <div className="absolute bottom-0 right-0 hidden h-screen w-1/2 lg:block">
          <Image
            src="/images/sign-up-image.png"
            alt="Login thumbnail"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </LayoutRow>
    </Layout>
  );
}
