import { createPool } from 'mysql2'
import { databaseConnectionObject } from "../../Secrets"
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Note } from '../models/note';
import { Dokument } from '../models/document';

export const pool = createPool(databaseConnectionObject).promise()

export async function GetUserByEmail(email: string): Promise<User> {
    const [rows]: [any, any] = await pool.query(`SELECT * FROM user WHERE email = "${email}"`);
    return rows[0];
}

export async function IsUsernameOrEmailTaken(username: string, email: string): Promise<boolean> {
    const result: [Array<any>, any] = await pool.query(`SELECT * FROM user WHERE username = "${username}" OR email = "${email}"`);
    return result[0].length > 0;
}

export async function GetSubjectByCreatorId(creatorId: string): Promise<Array<Subject>> {
    const result: [any[], any] = await pool.query(`SELECT * FROM subject WHERE creator = "${creatorId}"`);
    return result[0] as Subject[];
}

export async function GetNotesBySubjectId(subject_id: string): Promise<Array<Note>> {
    const result: [any[], any] = await pool.query(`SELECT * FROM note WHERE subject_id = "${subject_id}"`);
    return result[0] as Note[];
}

export async function GetPublicNotes(limit: number): Promise<Array<Note>> {
    const result: [any[], any] = await pool.query(`SELECT * FROM note where is_public = true LIMIT ${limit} `);
    return result[0] as Note[];
}

export async function GetDocumentsByNoteId(note_id: string): Promise<Dokument> {
    const result: [any, any] = await pool.query(`SELECT * FROM document WHERE note_id = "${note_id}" Limit 1`);
    return result[0][0] as Dokument;
}

export async function GetNoteNameById(note_id: string): Promise<string> {
    const result: [any, any] = await pool.query(`SELECT title FROM note WHERE id = "${note_id}"`);
    return result[0][0].title;
}

export async function GetNotesByUserId(user_id: string): Promise<Array<Note>> {
    const result: [any[], any] = await pool.query(`
        SELECT note.*
            FROM note
            JOIN subject ON note.subject_id = subject.id
            WHERE subject.creator = "${user_id}"
        `);
    return result[0] as Note[];
}