// Components
import { Layout, LayoutRow } from '@/components/global/Layout';
import { Logo } from '@/components/global/Logo';
import { Navigation } from '@/components/core/Navigation';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed left-0 top-0 h-24 w-full border-b border-grayscale-900">
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
                <div className="w-10 rounded-full bg-grayscale-400 text-center leading-10 text-white">
                  AH
                </div>
              </li>
            </ul>
          </nav>
        </Layout>
      </div>
      <div className="mt-24">{children}</div>
    </>
  );
}
