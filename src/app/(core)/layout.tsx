// External packages
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// Components
import { Layout } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { Menu, Navigation } from '@/components/core/Header';
import { Drawer } from '@/components/core/Drawer';

export default async function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <div className="fixed left-0 top-0 z-20 h-20 w-full border-b border-gray-900 bg-gray-100 2xl:h-24">
        <Layout className="h-full">
          <nav className="h-full">
            <ul className="flex h-full items-center justify-between">
              <li className="flex-1">
                <Logo />
              </li>
              <li className="hidden flex-1 justify-center gap-4 lg:flex">
                <Navigation />
              </li>
              <li className="hidden flex-1 justify-end lg:flex">
                <Menu />
              </li>
              <li className="lg:hidden">
                <Drawer />
              </li>
            </ul>
          </nav>
        </Layout>
      </div>
      <Layout className="mt-[104px] 2xl:mt-36">{children}</Layout>
    </>
  );
}
