/* Since we chnaged discover page to ssr, we need to change the query to get the notes from the server, so we put it inside the sql code as you can see belove. To see algorithm in action go to discover.ts file under the section GetPublicNotes (db/core/discover.ts).


*/
//  SELECT
//           n.id,
//           n.title,
//           n.details,
//           n.content,
//           n.is_public,
//           n.subject_id,
//           n.image_url,
//           n.date_created,
//           n.date_modified,
//           COUNT(DISTINCT l.user_id) AS likes,
//           MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS liked,
//           u.username AS creator_name,
//           u.id AS creator_id,
//           u.profile_picture_url as profile_image_url,
//           DATEDIFF(NOW(), n.date_created) AS days_since_created,
//           (
//             SQRT(COUNT(DISTINCT l.user_id)) * 2.5 +
//             MAX(CASE WHEN l.user_id = ? THEN 5 ELSE 0 END) +
//             (1 / (DATEDIFF(NOW(), n.date_created) + 1)) * 3
//           ) AS score
//       FROM
//           note n
//       JOIN
//           subject s ON n.subject_id = s.id
//       JOIN
//           user u ON s.creator_id = u.id
//       LEFT JOIN
//           likes l ON n.id = l.note_id
//       WHERE
//           n.is_public = 1
//           AND (n.title LIKE ? OR n.details LIKE ? OR u.username LIKE ?)
//       GROUP BY
//           n.id, n.title, n.details, n.content, n.is_public, n.subject_id,
//           n.image_url, n.date_created, n.date_modified, u.username,
//           u.id, u.profile_picture_url
//       ORDER BY
//           score DESC
//       LIMIT ?
//       OFFSET ?;

// Old algorithm for ranking notes

// // Models
// import { type Note } from '@/models/note';

// // Formula ranking = sqrt(L) × 2.5 + U×5 + T*3 +R (better explained in documentation)
// export const rankNotes = (notes: Note[]) => {
//   return notes
//     .map((note) => {
//       const daysSinceCreated =
//         (Date.now() - new Date(note.date_created).getTime()) /
//         (1000 * 60 * 60 * 24); // Days since it is last time created
//       const timeScore = 1 / (daysSinceCreated + 1);
//       const randomFactor = Math.random() * 7.5; // Randomizes in which order notes will be displayed

//       const score =
//         Math.sqrt(note.likes) * 2.5 +
//         (note.liked ? 5 : 0) +
//         timeScore * 3 +
//         randomFactor;

//       return { ...note, score };
//     })
//     .sort((a, b) => b.score - a.score); // Descending order
// };
