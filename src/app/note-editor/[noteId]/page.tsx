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
    images: {
      url: '/images/FaviconLogo.png',
    },
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
  const noteData: Note = await fetchNote(params.noteId, userId);

  return (
    /* To optimize document fetching during editing, we created a      separate page with the same header.
     This reduces fetches to just one instead of using debounce/throttle.
     We used a navigation guard to alert users if they try to leave editing mode without saving,warning that unsaved changes won’t be restored if they close the tab, browser, or try to navigate away to other page inside the app. */
    <NavigationGuardProvider>
      <Header />
      <Layout className="mt-[104px] 2xl:mt-[128px]">
        <LayoutRow className="h-[calc(100vh-116px-16px)] justify-center overflow-hidden 2xl:h-[calc(100vh-128px-32px)]">
          <LayoutColumn lg={8} xl2={10} className="flex h-full flex-col">
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
