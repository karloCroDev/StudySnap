// External packages
import { type Metadata } from 'next';
import { NavigationGuardProvider } from 'next-navigation-guard';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

// Components
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { TipTapEditor } from '@/components/note-editor/TipTapEditor';
import { Header } from '@/components/ui/header/Header';
import { type Note } from '@/models/note';

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
      url: '/images/favicon-logo.png',
    },
  },
};

// Fetch document data from the server
async function fetchNote(noteId: number, userId: number | null) {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/core/home/notes/editor?noteId=${noteId}&userId=${userId}`,
      { cache: 'no-cache' }
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
  params: { noteId: number };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id || null; // Null for handling the anonymous user
  const noteData: Note = await fetchNote(+params.noteId, userId);

  return (
    /* To improve document retrieval while editing, we developed a separate page featuring the same header. This minimizes fetches to just one, instead of relying on debounce or throttle methods. We implemented a navigation guard to notify users if they attempt to leave editing mode without saving, warning them that unsaved changes will be lost if they close the tab, browser, or navigate to another page within the app. We had to cover all exists of leaving the page, which is why the header appears here as well.
     */
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
              isLiked={noteData.liked}
              likeCount={noteData.likes}
            />
          </LayoutColumn>
        </LayoutRow>
      </Layout>
    </NavigationGuardProvider>
  );
}
