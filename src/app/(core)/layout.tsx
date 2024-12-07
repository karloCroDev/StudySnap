'use client';

// Components
import { Layout } from '@/components/ui/Layout';
import { Header } from '@/components/core/Header';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Layout className="mt-32 lg:mt-42">{children}</Layout>
    </>
  );
}
