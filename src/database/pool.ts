import { createPool } from 'mysql2';
import { databaseConnectionObject } from '../../Secrets';
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Note } from '../models/note';
import { Dokument } from '../models/document';

//Kada idem na localhost 3000 baci me na onu test stranicu
//kada likeam ne promjeni se broj likeova
//discover mora ici na vise stranica
//edit page jos ne radi
//promijeni sliku baze
//Morat ces remakeat database
//Need to verify token every time
let pool = createPool(databaseConnectionObject).promise();

export function getPool() {
  if (!pool) {
    pool = createPool(databaseConnectionObject).promise();
  }
  return pool;
}

export async function GetUserByEmail(email: string): Promise<User> {
  const [rows]: [any, any] = await getPool().query(`
        SELECT * FROM user WHERE email = "${email}" LIMIT 1
    `);
  return rows[0] as User;
}

export async function GetUserById(id: string): Promise<User> {
  const [rows]: [any, any] = await getPool().query(`
        SELECT * FROM user WHERE id = "${id}" LIMIT 1
    `);
  return rows[0] as User;
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

export async function GetSubjectByCreatorId(
  creatorId: string
): Promise<Array<Subject>> {
  const result: [any[], any] = await getPool().query(`
        SELECT * FROM subject WHERE creator = ${creatorId}
    `);
  return result[0] as Subject[];
}

export async function GetSubjectById(id: string): Promise<Subject> {
  const result: [any, any] = await getPool().query(`
        SELECT * FROM subject WHERE id = ${id} LIMIT 1
    `);
  return result[0] as Subject;
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
            n.is_public,
            n.subject_id,
            n.image,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = u.id THEN 1 ELSE 0 END) AS liked,
            u.username AS creator_name,
            u.id AS creator_id
        FROM
            note n
        JOIN
            subject s ON n.subject_id = s.id
        JOIN
            user u ON s.creator = u.id
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
  return result[0] as Note[];
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
            n.is_public,
            n.subject_id,
            n.image,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = ${userId} THEN 1 ELSE 0 END) AS liked,
            u.username AS creator_name,
            u.id AS creator_id
        FROM
            note n
        JOIN
            subject s ON n.subject_id = s.id
        JOIN
            user u ON s.creator = u.id
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
  console.log(result);
  return result[0] as Note[];
}

export async function GetDocumentsByNoteId(note_id: string): Promise<Dokument> {
  const result: [any, any] = await pool.query(`
        SELECT * FROM document WHERE note_id = ${note_id} Limit 1
    `);
  return result[0][0] as Dokument;
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

export async function GetNotesByUserId(user_id: string): Promise<Array<Note>> {
  const result: [any[], any] = await getPool().query(
    `
        SELECT
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            n.image,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = u.id THEN 1 ELSE 0 END) AS liked,
            u.username AS creator_name,
            u.id AS creator_id
        FROM
            note n
        JOIN
            subject s ON n.subject_id = s.id
        JOIN
            user u ON s.creator = u.id
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
    [user_id]
  );
  return result[0] as Note[];
}

export async function GetNoteById(note_id: string): Promise<Note> {
  const result: [any, any] = await getPool().query(
    `
        SELECT
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            n.image,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = u.id THEN 1 ELSE 0 END) AS liked,
            u.username AS creator_name,
            u.id AS creator_id
        FROM
            note n
        JOIN
            subject s ON n.subject_id = s.id
        JOIN
            user u ON s.creator = u.id
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
    [note_id]
  );
  return result[0] as Note;
}
