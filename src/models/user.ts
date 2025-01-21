import { getPool } from '../database/pool';

//Todo add cascade delete
export interface User {
  id: string;
  date_created: Date;
  date_modified: Date;
  username: string;
  password: string;
  email: string;
  profile_picture: string | null;
}

export class UserClass {
  static async Insert(
    username: string,
    email: string,
    hashedPassword: string,
    profile_picture: string | null
  ): Promise< string | null> {
    try {
      const [result]: any = await getPool().execute(
        `
        INSERT INTO user (username, email, password, profile_picture)
        VALUES (?, ?, ?, ?);
      `,
        [username, email, hashedPassword, profile_picture]
      );
      return result.insertId as string
    } catch (err) {
      console.error('Error inserting document:', err);
      return null
    }
  }

  static async Update(id: string, updates: { [key: string]: any }): Promise<void> {
    try {
      let values = [];

      for (const [key, value] of Object.entries(updates)) {
        typeof value === 'number' ? values.push(`${key} = ${value}`) : values.push(`${key} = "${value}"`);
      }

      await getPool().execute( `
        UPDATE user
        SET ${values.join(', ')}, date_modified = CURRENT_TIMESTAMP
        WHERE id = ${id};
      `);

    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  static async Delete(id: string): Promise<void> {
    try {
      await getPool().execute(
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
