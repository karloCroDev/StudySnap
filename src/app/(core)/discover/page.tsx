// External packages
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { NoteCard } from '@/components/core/NoteCard';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { Note } from '@/models/note';
// Images
import ImageExample from '@/public/images/login-image.png';

export default async function Disover() {
  let notes: Array<Note> = [];

  try {
    const response = await fetch(`http://localhost:3000/api/core/discover`, {
      method: 'POST',
    });
    let data: any = null;
    if (response.ok) {
      data = await response.json();
    }
    notes = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
  }

  return (//Ja mogu brisati tuđe noteove ???
    <>
      <SearchableHeader title="Discover" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="sm:-mr-4">
            {notes.map((note, i) => (
              <LayoutColumn sm={6} lg={4} xl2={3} className="mb-8 sm:pr-4">
                <NoteCard
                  noteid={note.id}
                  title={note.title}
                  description={note.details}
                  likes={100}
                  author="Ivan Horvat"//todo query author and likes
                  userImage={ImageExample.src}//fix images
                  key={i}
                />
              </LayoutColumn>
            ))}
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
