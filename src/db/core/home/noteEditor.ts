// Database
import { getPool } from '@/db/db';

//Models
import { Note } from '@/models/note';

// Database (handling the images)
import { GetImage, GetProfileImage } from '@/db/imageHandler';

// Gets data for document
export async function GetNoteById(
  note_id: string,
  user_id: string | null
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

  return result[0][0] as Note;
}
