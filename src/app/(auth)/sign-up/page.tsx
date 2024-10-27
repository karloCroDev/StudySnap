// External packages
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Logo } from '@/components/global/Logo';
import { Layout, LayoutColumn, LayoutRow } from '@/components/global/Layout';
import { SignupForm } from '@/components/auth/sign-up/SignupForm';
// Images
import ImageLogin from '@/public/images/login-image.png';

export const metadata: Metadata = {
  title: 'Log in',
  description:
    'Quick, log in to StudySnap! The faster you fill up, the closer you will be to a revolutionary way of handling studies',
};

export default function Signup() {
  return (
    <Layout>
      <LayoutRow className="h-screen flex-col flex-nowrap">
        <Logo className="mt-5 2xl:mt-10" />
        <LayoutColumn
          xs={12}
          lgOffset={1}
          lg={4}
          className="flex flex-1 items-center"
        >
          <div className="mt-12 pb-6 2xl:mt-0">
            <h1 className="text-2xl font-bold sm:text-3xl xl:text-4xl">
              Let's get started!
            </h1>
            <p className="mt-4 text-sm text-grayscale-400 md:text-base">
              The faster you fill up, the closer you will be to a revolutionary
              way of handling studies
            </p>
            <SignupForm />
            <p className="mt-4 text-grayscale-400 xl:mt-12">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-grayscale-900 underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </LayoutColumn>
        {/* note: Hacky way of doing this, but want to pursue the layout in the app */}
        <Image
          src={ImageLogin}
          alt="Login thumbnail"
          className="absolute bottom-0 right-0 hidden h-screen w-1/2 object-cover lg:block"
        />
      </LayoutRow>
    </Layout>
  );
}
