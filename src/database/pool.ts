import { createPool } from 'mysql2'
import { databaseConnectionObject } from "../../Secrets"
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Note } from '../models/note';
import { Dokument } from '../models/document';

//Kada idem na localhost 3000 baci me na onu test stranicu
//edit profile page jos ne radi
//When creating a note the app breaks
//promijeni sliku baze
//Need to verify token every time
//When creating new subjectr image does not load so the tab is empty
//Delete document
let pool = createPool(databaseConnectionObject).promise()

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

export async function IsUsernameOrEmailTaken(username: string, email: string): Promise<boolean> {
    const result: [Array<any>, any] = await getPool().query(`
        SELECT * FROM user WHERE username = "${username}" OR email = "${email}" LIMIT 1
    `);
    return result[0].length > 0;
}

export async function GetSubjectByCreatorId(creatorId: string): Promise<Array<Subject>> {
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

export async function GetNotesBySubjectId(subject_id: string): Promise<Array<Note>> {
    const result: [any[], any] = await getPool().query(`
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
    `, [subject_id]);
    return result[0] as Note[];
}

export async function GetPublicNotes(limit: number, offset: number = 0, userId: string): Promise<Array<Note>> {
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
    return result[0] as Note[];
}
export async function GetNoteById(note_id: string, user_id: string): Promise<Note> {
    const result: [any, any] = await getPool().query(`
        SELECT
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            n.image,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = ${user_id} THEN 1 ELSE 0 END) AS liked,
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
        WHERE n.id = ${note_id}
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `);
    return result[0][0] as Note;
}
export async function GetDocumentsByNoteId(note_id: string, user_id: string): Promise<Dokument> {
    const result: [any, any] = await pool.query(`
        SELECT
            id,
            content
        FROM document
        WHERE
            note_id = ${note_id}
    `);
    const note = await GetNoteById(note_id, user_id)
    const resulta = { ...result[0][0], ...note }
    console.log(resulta)
    return resulta as Dokument;
}

export async function GetNoteNameById(note_id: string): Promise<string> {
    const result: [any, any] = await getPool().query(`SELECT title FROM note WHERE id = ${note_id}`);
    return result[0][0].title;
}

export async function GetNotesByCreatorId(creator_id: string, user_id: string): Promise<Array<Note>> {
    const result: [any[], any] = await getPool().query(`
        SELECT
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            n.image,
            COUNT(DISTINCT l.user_id) AS likes,
            MAX(CASE WHEN l.user_id = ${user_id} THEN 1 ELSE 0 END) AS liked,
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
        WHERE u.id = ${creator_id} AND n.is_public = true
        GROUP BY
            n.id,
            n.title,
            n.details,
            n.is_public,
            n.subject_id,
            u.username
    `);
    return result[0] as Note[];
}

