// Lib
import { getPool } from '@/lib/db/db';

//Models
import { type Note } from '@/models/note';

// Database (handling the images)
import { GetImage, GetProfileImage } from '@/lib/db/imageHandler';

// Lib (algorithm)
import { rankNotes } from '@/lib/db/algorithms/alogirthm';

// Gets all public notes for discover section
export async function GetPublicNotes(
  limit: number,
  offset: number = 0,
  userId: string,
  filter: string
): Promise<Array<Note>> {
  filter = `%${filter}%`
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
            n.date_created,
            n.date_modified,
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
        WHERE n.is_public = 1 AND (n.title LIKE ? OR n.content LIKE ?)
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username 
        LIMIT ?
        OFFSET ?
    `,
    [userId, limit, offset, filter, filter]
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
  const algorithmValue = rankNotes(notesWithImages);
  return algorithmValue;
}
