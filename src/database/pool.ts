import { createPool } from 'mysql2'
import { databaseConnectionObject } from "../../Secrets"
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Note } from '../models/note';

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

export async function GetDocumentsByNoteId(note_id: string): Promise<Document> {
    const result: [any, any] = await pool.query(`SELECT * FROM document WHERE note_id = "${note_id} Limit 1"`);
    return result[0];
}