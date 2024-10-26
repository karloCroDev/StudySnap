// External packages
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Logo } from '@/components/global/Logo';
import { Layout, LayoutColumn, LayoutRow } from '@/components/global/Layout';
import { LoginForm } from '@/components/auth/LoginForm';
// Images
import ImageLogin from '@/public/images/login-image.png';

export const metadata = {
  title: 'Log in',
  descrption:
    'Quick, log in to StudySnap! The faster you fill up, the closer you will be to a revolutionary way of handling studies',
};

export default function Login() {
  return (
    <Layout>
      <LayoutRow className="h-screen flex-col">
        <Logo className="mt-10" />
        <LayoutColumn
          xs={12}
          mdOffset={1}
          md={4}
          className="flex flex-1 items-center"
        >
          <div>
            <h1 className="text-4xl font-bold">Welcome back!</h1>
            <p className="text mt-4 text-grayscale-400">
              The faster you fill up, the closer you will be to a revolutionary
              way of handling studies
            </p>
            <LoginForm />
            <p className="mt-12 text-grayscale-400">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="font-semibold text-grayscale-900 underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </LayoutColumn>
        {/* note: Hacky way of doing this, but want to be consistent with layout */}
        <Image
          src={ImageLogin}
          alt="Login thumbnail"
          className="absolute bottom-0 right-0 hidden h-screen w-1/2 object-cover md:block"
        />
      </LayoutRow>
    </Layout>
  );
}
