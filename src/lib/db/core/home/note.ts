// Lib
import { getPool } from '@/lib/db/db';
import { noteCache } from '@/lib/db/algorithms/caching';

//Models
import { type Note } from '@/models/note';

// Database (handling the images)
import { GetImage, GetProfileImage } from '@/lib/db/imageHandler';

export async function GetNoteById(
  note_id: string,
  user_id: string
): Promise<Note> {
  const result: [any, any] = await getPool().query(
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
        WHERE n.id = ?
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `,
    [user_id, note_id]
  );
  result[0][0].encoded_image = await GetImage(result[0][0].image_url);
  result[0][0].encoded_profile_image = await GetProfileImage(
    result[0][0].profile_image_url
  );
  return result[0][0] as Note;
}

export async function GetNotesBySubjectId(
  subject_id: string,
  filter: string
): Promise<Array<Note>> {
  filter = `%${filter}%`

  //Trying to find notes in cache
  const cacheKey = `GetNotesBySubjectId_${subject_id}`;
  const cachedNotes = await noteCache.get(cacheKey);
  // if (cachedNotes){return cachedNotes as Note[]}

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
            MAX(CASE WHEN l.user_id = u.id THEN 1 ELSE 0 END) AS liked,
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
        WHERE s.id = ? AND (n.title LIKE ? OR n.content LIKE ?)
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `,
    [subject_id, filter, filter]
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
  //Adding notes ot cache
  noteCache?.put(cacheKey, notesWithImages);

  return notesWithImages as Note[];
}
