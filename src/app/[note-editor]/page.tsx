// External packages
import { NavigationGuardProvider } from 'next-navigation-guard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/note-editor/TipTapEditor';
import { Header } from '@/components/ui/header/Header';

export default async function NoteEditor() {
  const session = await getServerSession(authOptions);
  // Change this once I am logged in again
  if (session) {
    redirect('/login');
  }
  // Explanation

  return (
    <NavigationGuardProvider>
      <Header />
      <Layout className="mt-[104px] 2xl:mt-[128px]">
        <LayoutRow className="h-[calc(100vh-116px-16px)] justify-center overflow-hidden 2xl:h-[calc(100vh-128px-32px)]">
          <LayoutColumn lg={9} xl2={10} className="flex h-full flex-col">
            <TipTapEditor />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </NavigationGuardProvider>
  );
}
