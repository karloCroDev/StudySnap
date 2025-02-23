// External packages
import { type Metadata } from 'next';
import { NavigationGuardProvider } from 'next-navigation-guard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/note-editor/TipTapEditor';
import { Header } from '@/components/ui/header/Header';

// Models (types)
import { Dokument } from '@/models/document';

// Metadata
export const metadata: Metadata = {
  title: 'Document',
  description:
    'Learn and study faster with help of an AI only with StudySnap 🔮',
  openGraph: {
    title: 'Document',
    description:
      'Learn and study faster with help of an AI only with StudySnap 🔮',
    siteName: 'StudySnap',
    images: {
      url: '/images/FaviconLogo.png',
    },
  },
};
async function fetchDocument(noteId: string, currentUserId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/core/note-editor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteId, currentUserId }),
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
  const documentData: Dokument = await fetchDocument(
    params.noteId,
    session?.user.id || 0 // Luka: I don't think this will be neccessary when you fetch with note (but if it is important, just add some example id that 100% won't be in db - like zero)
  );
  console.log(documentData);
  return (
    <NavigationGuardProvider>
      <Header />
      <Layout className="mt-[104px] 2xl:mt-[128px]">
        <LayoutRow className="h-[calc(100vh-116px-16px)] justify-center overflow-hidden 2xl:h-[calc(100vh-128px-32px)]">
          <LayoutColumn lg={9} xl2={10} className="flex h-full flex-col">
            <TipTapEditor
              title={documentData.title}
              content={documentData.content}
              author={documentData.author}
              creatorId={documentData.creator_id}
              noteId={documentData.note_id}
              documentId={documentData.id}
              isLiked={documentData.liked}
              likeCount={documentData.likes}
            />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </NavigationGuardProvider>
  );
}
