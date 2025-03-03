// Lib
import { getPool } from '@/lib/db/db';
import { noteCache } from '@/lib/db/algorithms/caching';

//Models
import { Note } from '@/models/note';

// Database (handling the images)
import { GetImage, GetProfileImage } from '@/lib/db/imageHandler';

//Models
import { type User } from '@/models/user';

// Gets all notes from creator
export async function GetNotesByCreatorId(
  creator_id: string,
  user_id: string
): Promise<Array<Note>> {
  const cacheKey = `GetNotesByCreatorId_${creator_id}_${user_id}`;
  const cachedNotes = await noteCache.get(cacheKey);
  //if (cachedNotes){return cachedNotes as Note[]}

  const result: [any[], any] = await getPool().query(
    `
        SELECT
            n.id,
            n.title,
            n.details,
            n.content,
            n.is_public,
            n.subject_id,
            n.image_url,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS liked,
            u.username AS creator_name,
            u.id AS creator_id,
            u.profile_picture_url as profile_image_url
        FROM
            note n
        JOIN
            subject s ON n.subject_id = s.id
        JOIN
            user u ON s.creator_id = u.id
        LEFT JOIN
            likes l ON n.id = l.note_id
        WHERE u.id = ? AND n.is_public = true
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `,
    [user_id, creator_id]
  );
  const notesWithImages = await Promise.all(
    result[0].map(async (note) => {
      const image = await GetImage(note.image_url);
      const encoded_profile_image = await GetProfileImage(
        note.profile_image_url
      );
      return {
        ...note,
        encoded_image: image,
        encoded_profile_image: encoded_profile_image,
      };
    })
  );

  noteCache?.put(cacheKey, notesWithImages);

  return notesWithImages as Note[];
}

// Gets data for wanted user by using the id
export async function GetUserById(id: string): Promise<User | null> {
  const result: [any, any] = await getPool().query(
    `
        SELECT * FROM user WHERE id = ? LIMIT 1
    `,
    [id]
  );
  if (!result[0]) return null;

  result[0][0].encoded_image = await GetImage(result[0][0].profile_picture_url);
  return result[0][0] as User;
}

// Retrieve all notes that a user has liked, but only if they are currently public. If a note was previously public but has since been made private, it's no longer be included
export async function GetLikedNotes(user_id: string): Promise<Array<Note>> {
  const cacheKey = `GetLikedNotes_${user_id}`;
  const cachedNotes = await noteCache.get(cacheKey);
  //if (cachedNotes){return cachedNotes as Note[]}

  const result: [any[], any] = await getPool().query(
    `
      SELECT
      n.id,
      n.title,
      n.details,
      n.content,
      n.is_public,
      n.subject_id,
      n.image_url,
      COUNT(DISTINCT l.user_id) AS likes,
      1 AS liked,
      u.username AS creator_name,
      u.id AS creator_id,
      u.profile_picture_url as profile_image_url
  FROM
      note n
  JOIN
      subject s ON n.subject_id = s.id
  JOIN
      user u ON s.creator_id = u.id
  JOIN
      likes l ON n.id = l.note_id
  WHERE
      l.user_id = ?  -- MySQL placeholder
      AND n.is_public = TRUE
  GROUP BY
      n.id, n.title, n.details, n.content, n.is_public, n.subject_id, n.image_url, 
      u.username, u.id, u.profile_picture_url;

    `,
    [user_id]
  );
  const notesWithImages = await Promise.all(
    result[0].map(async (note) => {
      const image = await GetImage(note.image_url);
      const encoded_profile_image = await GetProfileImage(
        note.profile_image_url
      );
      return {
        ...note,
        encoded_image: image,
        encoded_profile_image: encoded_profile_image,
      };
    })
  );

  noteCache?.put(cacheKey, notesWithImages);

  return notesWithImages as Note[];
}
