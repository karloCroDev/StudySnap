// Database
import { getPool } from '@/db/db';

//Models
import { type Note } from '@/models/note';

// Gets all public notes for discover section
export async function GetPublicNotes(
  limit: number,
  offset: number = 0,
  userId: string,
  filter: string
): Promise<Array<Note>> {
  filter = `%${filter}%`;
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
          u.profile_picture_url as profile_image_url,
          DATEDIFF(NOW(), n.date_created) AS days_since_created,
          (
            SQRT(COUNT(DISTINCT l.user_id)) * 2.5 +
            MAX(CASE WHEN l.user_id = ? THEN 5 ELSE 0 END) +
            (1 / (DATEDIFF(NOW(), n.date_created) + 1)) * 3
          ) AS score
      FROM
          note n
      JOIN
          subject s ON n.subject_id = s.id
      JOIN
          user u ON s.creator_id = u.id
      LEFT JOIN
          likes l ON n.id = l.note_id
      WHERE
          n.is_public = 1
          AND (n.title LIKE ? OR n.details LIKE ? OR u.username LIKE ?)
      GROUP BY
          n.id, n.title, n.details, n.content, n.is_public, n.subject_id, 
          n.image_url, n.date_created, n.date_modified, u.username, 
          u.id, u.profile_picture_url
      ORDER BY
          score DESC
      LIMIT ?
      OFFSET ?;
    `,
    [userId, userId, filter, filter, filter, limit, offset]
  );

  return result[0];
}

export async function GetRandomNotes(
  limit: number,
  userId: string
): Promise<Array<Note>> {
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
          WHERE n.is_public = 1 
          GROUP BY
              n.id,
              n.title,
              n.details,
              n.is_public,
              n.subject_id,
              u.username 
          ORDER BY RAND()
          LIMIT ?
      `,
    [userId, limit]
  );

  return result[0];
}

export async function GetNumberOfPublicNotes() {
  const result: [any[], any] = await getPool().query(
    `
            SELECT COUNT(*)
            FROM note n
            WHERE n.is_public = 1 
        `
  );
  return Object.values(result[0][0])[0] as number;
}
