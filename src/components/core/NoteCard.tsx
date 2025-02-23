'use client';

// External packages
import * as React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Components
import { DialogChangeDetails } from '@/components/core/note/DialogChangeDetails';
import { DialogDelete } from '@/components/core/note/DialogDelete';
import { Avatar } from '@/components/ui/Avatar';
import { LikeComponent } from '@/components/ui/LikeComponent';
// Karlo : Make sure that Notes types are here, fix this if we have time

export const NoteCard: React.FC<{
  noteId: string;
  title: string;
  description: string;
  author: string;
  isPublic: boolean;
  userImage?: string;
  numberOfLikes: number;
  liked: boolean;
  creatorId: string;
}> = ({
  noteId,
  title,
  description,
  userImage,
  author,
  isPublic,
  numberOfLikes,
  liked,
  creatorId,
}) => {
  const user = useSession();

  const likeAction = async () => {
    try {
      await fetch('http://localhost:3000/api/core/home/notes/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteId,
          userId: user.data?.user.id,
          exists: liked,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [noteName, setNoteName] = React.useState(title);
  const [noteDetails, setNoteDetails] = React.useState(description);

  // Real time updating if user chnages his name (instead of refreshing)
  const authorCheck =
    creatorId.toString() === user.data?.user.id ? user.data.user.name : author;

  return (
    <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400 text-blue-900">
      <div className="flex aspect-square flex-col p-6 pb-4">
        <div>
          <h3 className="w-3/5 break-words text-xl font-semibold">
            {noteName}
          </h3>
          {description && <p className="text-xs font-medium">{noteDetails}</p>}
        </div>
        <div className="z-10 mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              imageProps={{
                src: userImage,
                alt: '',
              }}
            >
              {authorCheck}
            </Avatar>

            <Link
              href={`/public-profile/${creatorId}`}
              className="font-medium underline-offset-2 hover:underline"
            >
              {authorCheck}
            </Link>
          </div>

          <LikeComponent
            hasBeenLiked={liked}
            isOrderReversed
            numberOfLikes={numberOfLikes}
            noteId={noteId}
            userId={user.data?.user.id!}
          />
        </div>
      </div>
      {user.data?.user.id === creatorId.toString() && (
        <ul className="absolute right-5 top-8 z-10 flex gap-4 duration-200 group-hover:opacity-100 md:pointer-events-none md:animate-card-options-unhovered md:opacity-0 md:transition-opacity md:group-hover:pointer-events-auto md:group-hover:animate-card-options-hover">
          <li>
            <DialogChangeDetails
              noteName={noteName}
              setNoteName={setNoteName}
              noteDetails={noteDetails}
              setNoteDetails={setNoteDetails}
              isNotePublic={isPublic}
              noteId={noteId}
            />
          </li>
          <li>
            <DialogDelete noteId={noteId} noteName={noteName} />
          </li>
        </ul>
      )}
      <Link href={`/note-editor/${noteId}`} className="absolute inset-0" />
    </div>
  );
};
