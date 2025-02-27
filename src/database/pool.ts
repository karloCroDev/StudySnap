//External libraries
import { createPool } from 'mysql2';
//Models
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Note } from '../models/note';
//Handling of images
import { GetImage, GetProfileImage } from './ImageHandler';
//Object with credentials for connecting to the database
import { databaseConnectionObject } from '../../Secrets';


let pool = createPool(databaseConnectionObject).promise()

export function getPool() {
  if (!pool) {
    pool = createPool(databaseConnectionObject).promise();
  }
  return pool;
}

export async function GetUserByEmail(email: string): Promise<User> {
  const result: [any, any] = await getPool().query(`
        SELECT * FROM user WHERE email = "${email}" LIMIT 1
    `);
  result[0][0].encoded_image =  await GetImage(result[0][0].profile_picture_url);
  return result[0][0] as User;
}

export async function GetUserById(id: string): Promise<User | null> {
  const result: [any, any] = await getPool().query(`
        SELECT * FROM user WHERE id = "${id}" LIMIT 1
    `);
  if (!result[0]) return null

  result[0][0].encoded_image = await GetImage(result[0][0].profile_picture_url);
  return result[0][0] as User;
}

export async function IsUsernameOrEmailTaken(
  username: string,
  email: string
): Promise<boolean> {
  const result: [Array<any>, any] = await getPool().query(`
        SELECT * FROM user WHERE username = "${username}" OR email = "${email}" LIMIT 1
    `);
  return result[0].length > 0;
}

export async function GetSubjectByCreatorId(creatorId: string): Promise<Array<Subject>> {
    const result: [any[], any] = await getPool().query(`
        SELECT * FROM subject WHERE creator_id = ${creatorId}
    `);
  const subjectsWithImages = await Promise.all(result[0].map(async subject => {
    const image = await GetImage(subject.image_url);
    return {
      ...subject, "encoded_image": image
    };
  }));
  return subjectsWithImages as Subject[];
}

export async function GetSubjectById(id: string): Promise<Subject> {
  const result: [any, any] = await getPool().query(`
        SELECT * FROM subject WHERE id = ${id} LIMIT 1
    `);
    result[0][0].encoded_image =  await GetImage(result[0][0].image_url);
    return result[0][0] as Subject;
  }


export async function GetNotesBySubjectId(
  subject_id: string
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
        WHERE s.id = ?
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `,
    [subject_id]
  );
  const notesWithImages = await Promise.all(result[0].map(async note => {
    const image = await GetImage(note.image_url);
    const encoded_profile_image = await GetProfileImage(note.profile_image_url)
    return {
      ...note, "encoded_image": image, "encoded_profile_image": encoded_profile_image
    };
  }));
  return notesWithImages as Note[];
}

export async function GetPublicNotes(
  limit: number,
  offset: number = 0,
  userId: string
): Promise<Array<Note>> {
  const result: [any[], any] = await getPool().query(`
        SELECT
            n.id,
            n.title,
            n.details,
            n.content,
            n.is_public,
            n.subject_id,
            n.image_url,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = ${userId} THEN 1 ELSE 0 END) AS liked,
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
        LIMIT ${limit}
        OFFSET ${offset}
    `);
    const notesWithImages = await Promise.all(result[0].map(async note => {
      const image = await GetImage(note.image_url);
      const encoded_profile_image = await GetProfileImage(note.profile_image_url)
      return {
        ...note, "encoded_image": image, "encoded_profile_image": encoded_profile_image
      };
    }));
    return notesWithImages as Note[];
  }


export async function GetNoteById(note_id: string, user_id: string): Promise<Note> {
    const result: [any, any] = await getPool().query(`
        SELECT
            n.id,
            n.title,
            n.details,
            n.content,
            n.is_public,
            n.subject_id,
            n.image_url,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = ${user_id} THEN 1 ELSE 0 END) AS liked,
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
        WHERE n.id = ${note_id}
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `);
  result[0][0].encoded_image = await GetImage(result[0][0].image_url);
  result[0][0].encoded_profile_image = await GetProfileImage(result[0][0].profile_image_url)
  return result[0][0] as Note;
}

// Luka: fix I expanded queries to get fields I need for document (creatorId, likes, liked)
export async function GetNoteNameById(
  note_id: string,
  current_user_id: string
): Promise<{
  title: string;
  author: string;
  creator_id: string;
  likes: number;
  liked: boolean;
}> {
  const resultNote: [any, any] = await getPool().query(`
    SELECT title, subject_id 
    FROM note 
    WHERE id = ${note_id}
`);
  const queryNote = resultNote[0][0];

  const resultSubject: [any, any] = await getPool().query(`
    SELECT name, creator
    FROM subject 
    WHERE id = ${queryNote.subject_id}
`);
  const querySubject = resultSubject[0][0];

  const resultUser: [any, any] = await getPool().query(
    `SELECT username FROM user WHERE id = ${querySubject.creator}`
  );
  const queryUser = resultUser[0][0];

  const resultLike: [any, any] = await getPool().query(
    `
    SELECT COUNT(DISTINCT l.user_id) AS likes,
    MAX(CASE WHEN l.user_id = ${current_user_id} THEN 1 ELSE 0 END) AS liked
    FROM \`likes\` l
    WHERE l.note_id = ${note_id}
    `
  );
  const queryLike = resultLike[0][0];

  return {
    title: queryNote.title,
    author: queryUser.username,
    creator_id: querySubject.creator,
    likes: queryLike.likes,
    liked: queryLike.liked,
  };
}

export async function GetNotesByCreatorId(creator_id: string, user_id: string): Promise<Array<Note>> {
    const result: [any[], any] = await getPool().query(`
        SELECT
            n.id,
            n.title,
            n.details,
            n.content,
            n.is_public,
            n.subject_id,
            n.image_url,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = ${user_id} THEN 1 ELSE 0 END) AS liked,
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
        WHERE u.id = ${creator_id} AND n.is_public = true
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `);
    const notesWithImages = await Promise.all(result[0].map(async note => {
      const image = await GetImage(note.image_url);
      const encoded_profile_image = await GetProfileImage(note.profile_image_url)
      return {
        ...note, "encoded_image": image, "encoded_profile_image": encoded_profile_image
      };
    }));
    return notesWithImages as Note[];
  }

