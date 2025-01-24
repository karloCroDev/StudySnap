// External packages
import { TrashIcon, Pencil1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

// Components
import { DialogChangeDetails } from '@/components/core/note/DialogChangeDetails';
import { DialogDelete } from '@/components/core/note/DialogDelete';
import { Avatar } from '@/components/ui/Avatar';
import { LikeComponent } from '@/components/ui/LikeComponent';

// Karlo and Luka: Make sure that Notes types are here, fix this if we have time

export const NoteCard: React.FC<{
  noteId: string;
  title: string;
  description?: string;
  author: string;
  isPublic: boolean;
  userImage?: string;
  likes: number;
  liked: boolean;
  creatorId: string;
  userId: string;
}> = ({
  noteId,
  title,
  description,
  userImage,
  author,
  isPublic,
  likes,
  liked,
  creatorId,
  userId,
}) => {
  const likeAction = async () => {
    try {
      await fetch('http://localhost:3000/api/core/home/notes/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, userId, exists: liked }), //image
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-blue-400 text-blue-900">
      <div className="flex aspect-square flex-col p-6 pb-4">
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          {description && <p className="text-xs font-medium">{description}</p>}
        </div>
        <div className="z-10 mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              imageProps={{
                src: userImage,
                alt: '',
              }}
            >
              {author}
            </Avatar>

            <Link
              href={`/public-profile/${creatorId}`}
              className="font-medium underline-offset-2 hover:underline"
            >
              {author}
            </Link>
          </div>

          <LikeComponent
            hasBeenLiked={liked}
            isOrderReversed
            numberOfLikes={likes}
            action={likeAction}
          />
        </div>
      </div>
      {!isPublic && ( // Could make this to check if that user is registered
        <ul className="absolute right-5 top-8 z-10 flex gap-4 duration-200 group-hover:opacity-100 md:pointer-events-none md:animate-card-options-unhovered md:opacity-0 md:transition-opacity md:group-hover:pointer-events-auto md:group-hover:animate-card-options-hover">
          <li>
            <DialogChangeDetails noteId={noteId}>
              <Pencil1Icon
                className={twJoin(
                  'size-9 transition-colors hover:text-blue-400 lg:size-7'
                )}
              />
            </DialogChangeDetails>
          </li>
          <li>
            <DialogDelete noteId={noteId}>
              <TrashIcon
                className={twJoin(
                  'size-9 transition-colors hover:text-blue-400 lg:size-7'
                )}
              />
            </DialogDelete>
          </li>
        </ul>
      )}
      <Link href={`/note-editor/${noteId}`} className="absolute inset-0" />
    </div>
  );
};
