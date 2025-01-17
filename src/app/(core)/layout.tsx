// External packages
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// Components
import { Layout } from '@/components/ui/Layout';
import { Header } from '@/components/ui/header/Header';

export default async function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  // Chnage this to !session, only added this for checking the ui without regisration
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <Header />
      <Layout className="mt-[104px] 2xl:mt-[128px]">{children}</Layout>
    </>
  );
}
