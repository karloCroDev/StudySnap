import { createPool } from 'mysql2'
import { databaseConnectionObject } from "../../../../Secrets.js"

export const pool = createPool(databaseConnectionObject).promise()

export async function QueryUserByEmail(email) {
    const result = await pool.query(`SELECT * FROM user WHERE email = "${email}"`);
    return result[0][0];
}

export async function IsUsernameOrEmailTaken(username, email) {
    const result = await pool.query(`SELECT * FROM user WHERE username = "${username}" OR email = "${email}"`);
    return result[0].length > 0;
}
//console.log(await IsUsernameOrEmailTaken("gyf", "lkshgvf")) // Should output true if connected to database
//pool.end()