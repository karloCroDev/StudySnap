'use client'; // todo: Remove this

// External packages
import type { Metadata } from 'next';
import Image from 'next/image';

// Components
import { Logo } from '@/components/global/Logo';
import { Input } from '@/components/global/Input';
import { Button } from '@/components/global/Button';
import { Layout, LayoutColumn, LayoutRow } from '@/components/global/Layout';
import { Divider } from '@/components/global/Divider';

// Images
import ImageLogin from '@/public/images/login-image.png';

// export const metadata = {
//   title: 'Log in',
//   descrption:
//     'Quick, log in to StudySnap! The faster you fill up, the closer you will be to a revolutionary way of handling studies',
// };

export default function Login() {
  return (
    <Layout>
      <LayoutRow>
        <Logo />
        <LayoutColumn md={6} xs={12}>
          <Input
            label="Email"
            inputProps={{
              placeholder: 'Enter your email',
            }}
          />
          <Input
            label="Password"
            inputProps={{
              placeholder: '******',
            }}
          />
          <Button colorScheme="light-blue">Log in</Button>
          <Divider />
          <Button variant="outline" colorScheme="black">
            Log in with Google
          </Button>
        </LayoutColumn>
        <Image
          src={ImageLogin}
          alt="Login thumbnail"
          className="hidden md:block"
        />
      </LayoutRow>
    </Layout>
  );
}
