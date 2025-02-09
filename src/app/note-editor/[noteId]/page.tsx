// External packages
import { NavigationGuardProvider } from 'next-navigation-guard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/note-editor/TipTapEditor';
import { Header } from '@/components/ui/header/Header';

// Models (types)
import { Dokument } from '@/models/document';

async function fetchDocument(noteId: string, userId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/core/note-editor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteId, userId }),
    });
    if (!response.ok) throw new Error('Failed to fetch data');

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch dokument:', error);
  }
}

export default async function NoteEditor({
  params,
}: {
  params: { noteId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  const userId = session.user.id
  //Karlo: Everything should be provided in this variable
  const documentData: Dokument = await fetchDocument(params.noteId, userId);

  return (
    <NavigationGuardProvider>
      <Header />
      <Layout className="mt-[104px] 2xl:mt-[128px]">
        <LayoutRow className="h-[calc(100vh-116px-16px)] justify-center overflow-hidden 2xl:h-[calc(100vh-128px-32px)]">
          <LayoutColumn lg={9} xl2={10} className="flex h-full flex-col">
            <TipTapEditor
              title={documentData.title}
              content={documentData.content}
              creatorId={documentData.creator_id}
              noteId={documentData.id}
            />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </NavigationGuardProvider>
  );
}
