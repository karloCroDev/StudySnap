// Database
import { getPool } from '@/db/db';

//Models
import { Note } from '@/models/note';

//Models
import { type User } from '@/models/user';

// Gets all notes from creator
export async function GetNotesByCreatorId(
  creator_id: string,
  user_id: string
): Promise<Array<Note>> {
  const cacheKey = `GetNotesByCreatorId_${creator_id}_${user_id}`;
  //const cachedNotes = await noteCache.get(cacheKey);
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

  return result[0] as Note[];
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

  return result[0][0] as User;
}

// Retrieve all notes that a user has liked, but only if they are currently public. If a note was previously public but has since been made private, it's no longer be included
export async function GetLikedNotes(
  user_id: string,
  target_user_id: string
): Promise<Array<Note>> {
  const cacheKey = `GetLikedNotes_${user_id}`;
  //const cachedNotes = await noteCache.get(cacheKey);
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
        COUNT(DISTINCT l.user_id) AS likes, -- Count all likes for the note
        MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS liked, -- Check if the current user liked the note
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
        likes l ON n.id = l.note_id -- Use LEFT JOIN to include notes with no likes
    WHERE
        n.is_public = true -- Only include public notes
        AND EXISTS ( -- Ensure the target user has liked the note
            SELECT 1
            FROM likes l2
            WHERE l2.note_id = n.id
              AND l2.user_id = ?
        )
    GROUP BY
        n.id,
        n.title,
        n.details,
        n.is_public,
        n.subject_id,
        u.username
  `,
    [user_id, target_user_id]
  );

  return result[0] as Note[];
}
