// External packages
import type { Metadata } from 'next';
import { twJoin } from 'tailwind-merge';

// Fonts
import { poppins } from '@/libs/fonts';

// Metadata
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

//Global styles
import './globals.css';

// Components
import { Toast } from '@/components/ui/Toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twJoin(poppins.className, 'bg-gray-100')}>
        {children}
        <Toast />
      </body>
    </html>
  );
}