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
import {  noteCache } from '../lib/caching';


let pool = createPool(databaseConnectionObject).promise()

export function getPool() {
  if (!pool) {
    pool = createPool(databaseConnectionObject).promise();
  }
  return pool;
}

export async function GetUserByEmail(email: string): Promise<User> {
  const result: [any, any] = await getPool().query(`
        SELECT * FROM user WHERE email = ? LIMIT 1
    `,[email]);
  result[0][0].encoded_image =  await GetImage(result[0][0].profile_picture_url);
  return result[0][0] as User;
}

export async function GetUserById(id: string): Promise<User | null> {
  const result: [any, any] = await getPool().query(`
        SELECT * FROM user WHERE id = ? LIMIT 1
    `,[id]);
  if (!result[0]) return null

  result[0][0].encoded_image = await GetImage(result[0][0].profile_picture_url);
  return result[0][0] as User;
}

export async function IsUsernameOrEmailTaken(
  username: string,
  email: string
): Promise<boolean> {
  const result: [Array<any>, any] = await getPool().query(`
        SELECT * FROM user WHERE username = ? OR email = ? LIMIT 1
    `,[username, email]);
  return result[0].length > 0;
}

export async function GetSubjectByCreatorId(creatorId: string): Promise<Array<Subject>> {
    const result: [any[], any] = await getPool().query(`
        SELECT * FROM subject WHERE creator_id = ?
    `,[creatorId]);
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
        SELECT * FROM subject WHERE id = ? LIMIT 1
    `,[id]);
    result[0][0].encoded_image =  await GetImage(result[0][0].image_url);
    return result[0][0] as Subject;
  }


export async function GetNotesBySubjectId(
  subject_id: string
): Promise<Array<Note>> {
  //Trying to find notes in cache
  const cacheKey = `GetNotesBySubjectId_${subject_id}`
  const cachedNotes = await noteCache.get(cacheKey)
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
  //Adding notes ot cache 
  noteCache?.put(cacheKey, notesWithImages)

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
        LIMIT ?
        OFFSET ?
    `,[userId,limit,offset]);
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
    `,[user_id,note_id]);
  result[0][0].encoded_image = await GetImage(result[0][0].image_url);
  result[0][0].encoded_profile_image = await GetProfileImage(result[0][0].profile_image_url)
  return result[0][0] as Note;
}

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
  const result: [any, any] = await getPool().query(`
    SELECT
        n.title,
        COUNT(DISTINCT l.user_id) AS likes,
        MAX(CASE WHEN l.user_id = ? THEN 1 ELSE 0 END) AS liked,
        u.username AS author,
        u.id AS creator_id,
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
`,[current_user_id,note_id]);
  return {
    title: result[0][0].title,
    author: result[0][0].username,
    creator_id: result[0][0].creator,
    likes: result[0][0].likes,
    liked: result[0][0].liked,
  };
}

export async function GetNotesByCreatorId(creator_id: string, user_id: string): Promise<Array<Note>> {

  const cacheKey = `GetNotesByCreatorId_${creator_id}_${user_id}`
  const cachedNotes = await noteCache.get(cacheKey)
  //if (cachedNotes){return cachedNotes as Note[]}

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
    `,[user_id,creator_id]);
    const notesWithImages = await Promise.all(result[0].map(async note => {
      const image = await GetImage(note.image_url);
      const encoded_profile_image = await GetProfileImage(note.profile_image_url)
      return {
        ...note, "encoded_image": image, "encoded_profile_image": encoded_profile_image
      };
    }));

    noteCache?.put(cacheKey, notesWithImages)

    return notesWithImages as Note[];
  }

