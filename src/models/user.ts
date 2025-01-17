import { pool } from '../database/pool';

//Todo add cascade delete
export interface User {
  id: string,
  date_created: Date,
  date_modified: Date,
  username: string,
  password: string,
  email: string,
  profile_picture: string | null
}


export class UserClass {

  static async Insert(username: string, email: string, hashedPassword: string, profile_picture: string | null): Promise<void> {
    try {
      const [result]: any = await pool.execute(
        `
        INSERT INTO user (username, email, password, profile_picture)
        VALUES (?, ?, ?, ?);
      `,
        [username, email, hashedPassword, profile_picture]
      );
    } catch (err) {
      console.error('Error inserting document:', err);
    }
  }

  static async Update(username: string, email: string, hashedPassword: string, profile_picture: string, id: string): Promise<void> {
    try {
      await pool.execute(
        `
        UPDATE user
        SET username = ?, email = ?, password = ?, profile_picture = ?
        WHERE id = ?;
      `,
        [username, email, hashedPassword, profile_picture, id]
      );
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  static async Delete(id: string): Promise<void> {
    try {
      await pool.execute(
        `
        DELETE FROM user WHERE id = ?;
      `,
        [id]
      );
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }
}