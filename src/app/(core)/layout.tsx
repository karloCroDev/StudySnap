// Components
import { Layout } from '@/components/ui/Layout';
import { Header } from '@/components/ui/header/Header';

export default async function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Layout className="mt-[104px] 2xl:mt-[128px]">{children}</Layout>
    </>
  );
}
