// External packages
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { NavigationGuardProvider } from 'next-navigation-guard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/note-editor/TipTapEditor';
import { Header } from '@/components/ui/header/Header';
import { Note } from '@/models/note';

// Models (types)
// import { Dokument } from '@/models/document';

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
    // images: {
    //   url: '/images/FaviconLogo.png',
    // },
  },
};
async function fetchNote(noteId: string, userId: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/core/home/notes/editor`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, userId }),
      }
    );
    if (!response.ok) throw new Error('Failed to fetch data');

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch note:', error);
  }
}

export default async function NoteEditor({
  params,
}: {
  params: { noteId: string };
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id || 0;
  //Karlo: Everything is provided in this variable, you need to pass it to TipTapEditor
  //       you also can not change the title of the note
  //       It would also be good if you could pass the note in the parameters of this function rather than fetching the note all over again
  const noteData: Note = await fetchNote(params.noteId, userId);

  return (
    <NavigationGuardProvider>
      <Header />
      <Layout className="mt-[104px] 2xl:mt-[128px]">
        <LayoutRow className="h-[calc(100vh-116px-16px)] justify-center overflow-hidden 2xl:h-[calc(100vh-128px-32px)]">
          <LayoutColumn lg={9} xl2={10} className="flex h-full flex-col">
            <TipTapEditor
              title={noteData.title}
              content={noteData.content}
              author={noteData.creator_name}
              creatorId={noteData.creator_id}
              noteId={noteData.id}
              documentId={noteData.id}
              isLiked={noteData.liked}
              likeCount={noteData.likes}
            />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </NavigationGuardProvider>
  );
}
