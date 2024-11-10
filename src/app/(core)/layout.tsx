// Components
import { Layout } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { Navigation } from '@/components/core/Navigation';
import { Menu } from '@/components/core/Menu';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed left-0 top-0 h-24 w-full border-b border-gray-900">
        <Layout className="h-full">
          <nav className="h-full">
            <ul className="flex h-full items-center justify-between">
              <li>
                <Logo />
              </li>
              <li className="flex gap-4">
                <Navigation />
              </li>
              <li>
                <Menu />
              </li>
            </ul>
          </nav>
        </Layout>
      </div>
      <Layout className="mt-24">{children}</Layout>
    </>
  );
}
