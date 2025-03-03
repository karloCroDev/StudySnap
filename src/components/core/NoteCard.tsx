'use client';

// External packages
import * as React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { twJoin } from 'tailwind-merge';
import Image from 'next/image';

// Components
import { DialogChangeDetails } from '@/components/core/note/DialogChangeDetails';
import { DialogDelete } from '@/components/core/note/DialogDelete';
import { Avatar } from '@/components/ui/Avatar';
import { LikeComponent } from '@/components/ui/LikeComponent';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

// Note card that links to desired document
export const NoteCard: React.FC<{
  noteId: string;
  title: string;
  description: string;
  author: string;
  isPublic: boolean;
  encodedImage?: string | null;
  encodedUserImage?: string;
  numberOfLikes: number;
  liked: number;
  creatorId: string;
}> = ({
  noteId,
  title,
  description,
  encodedImage,
  encodedUserImage,
  author,
  isPublic,
  numberOfLikes,
  liked,
  creatorId,
}) => {
  const user = useSession();

  const [noteName, setNoteName] = React.useState(title);
  const [noteDetails, setNoteDetails] = React.useState(description);
  const [noteImage, setNoteImage] = React.useState('');

  // Real time updating if user chnages his name (instead of refreshing)
  const authorCheck =
    creatorId.toString() === user.data?.user.id ? user.data.user.name : author;

  const pfpCheck =
    creatorId.toString() === user.data?.user.id
      ? `data:image/jpeg;base64,${user.data?.user.image}`
      : `data:image/jpeg;base64,${encodedUserImage}`;

  return (
    <div
      className={twJoin(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400',
        noteImage || encodedImage ? 'text-gray-100' : 'text-blue-900'
      )}
    >
      <div className="flex aspect-square flex-col p-6 pb-4">
        <div>
          <h3 className="w-3/5 break-words text-xl font-semibold">
            {noteName}
          </h3>
          {description && (
            <p
              className={twJoin(
                'text-xs font-medium',
                noteImage || encodedImage ? 'text-gray-200' : 'text-gray-400'
              )}
            >
              {noteDetails}
            </p>
          )}
        </div>
        <div className="z-10 mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              imageProps={{
                src: pfpCheck,
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
            hasBeenLiked={Boolean(liked)}
            isOrderReversed
            numberOfLikes={numberOfLikes}
            noteId={noteId}
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
              setNoteImage={setNoteImage}
            >
              <Pencil1Icon
                className={twJoin(
                  'size-9 transition-colors lg:size-7',
                  noteImage || encodedImage
                    ? 'hover:text-gray-200'
                    : 'hover:text-blue-400'
                )}
              />
            </DialogChangeDetails>
          </li>
          <li>
            <DialogDelete noteId={noteId} noteName={noteName}>
              <TrashIcon
                className={twJoin(
                  'size-9 transition-colors lg:size-7',
                  noteImage || encodedImage
                    ? 'hover:text-gray-200'
                    : 'hover:text-blue-400'
                )}
              />
            </DialogDelete>
          </li>
        </ul>
      )}
      <Link href={`/note-editor/${noteId}`} className="absolute inset-0">
        {(noteImage || encodedImage) && (
          <div className="absolute left-0 top-0 -z-10 h-full w-full">
            <Image
              src={
                noteImage ||
                (encodedImage && `data:image/jpeg;base64,${encodedImage}`) ||
                ''
              }
              alt="Informative image about subject"
              className="h-full object-cover brightness-[45%]"
              fill
            />
          </div>
        )}
      </Link>
    </div>
  );
};
