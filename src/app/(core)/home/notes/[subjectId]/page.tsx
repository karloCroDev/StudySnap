// External packages
import Image from 'next/image';
import { getServerSession } from 'next-auth';


// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateNoteCard } from '@/components/core/note/CreateNoteCard';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Note } from '@/models/note';
// Images
import ImageExample from '@/public/images/login-image.png';

export default async function Notes({ params }: { params: { subjectId: string } }) {
  const { subjectId } = params;

  const session = await getServerSession(authOptions);

  let notes: Array<Note> = [];

  try {
    const response = await fetch(`http://localhost:3000/api/core/home/notes?subjectId=${subjectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();
    notes = Array.isArray(data) ? data : [];
    console.log(notes + "notes");
  } catch (error) {
    console.error(error);
  }


  return (
    <>
      <SearchableHeader title="Your notes" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="pr-0 sm:-mr-4">
            <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
              <CreateNoteCard subject = {subjectId} />
            </LayoutColumn>
            {notes.map((note, i) => (
              <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                <NoteCard
                  noteid = {note.id}
                  title={note.title}
                  description={note.details}
                  likes={100}
                  author={session.user.name}
                  key={i}
                />
              </LayoutColumn>
            ))}
          </LayoutRow>
        </LayoutColumn>
        <LayoutColumn lg={8}></LayoutColumn>
      </LayoutRow>
    </>
  );
}
