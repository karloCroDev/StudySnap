// External packages
import type { Metadata } from 'next';

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
import { Toast } from '@/components/Toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
      <Toast />
    </html>
  );
}
