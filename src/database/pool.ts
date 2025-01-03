import { createPool } from 'mysql2'
import { databaseConnectionObject } from "../../Secrets"
import { User } from '../models/user';
import { Subject } from '../models/subject';

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
