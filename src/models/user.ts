// Lib
import { getPool } from '@/lib/db/db';
import { DeleteImage } from '@/lib/db/imageHandler';

export interface User {
  id: string;
  date_created: Date;
  date_modified: Date;
  username: string;
  password: string;
  email: string;
  profile_picture_url: string | null;
  encoded_image: string;
}

export class UserClass {
  static async Insert(
    username: string,
    email: string,
    hashedPassword: string
  ): Promise<string | null> {
    try {
      const [result]: any = await getPool().execute(
        `
        INSERT INTO user (username, email, password)
        VALUES (?, ?, ?);
      `,
        [username, email, hashedPassword]
      );
      return result.insertId as string;
    } catch (err) {
      console.error('Error inserting document:', err);
      return null;
    }
  }

  static async Update(
    id: string,
    updates: { [key: string]: any }
  ): Promise<void> {
    try {
      // Updating all values in DB using paramters
      let setClauses: string[] = [];
      let values: any[] = [];

      for (const [key, value] of Object.entries(updates)) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }
      setClauses.push('date_modified = CURRENT_TIMESTAMP');
      values.push(id);

      const query = `
            UPDATE user
            SET ${setClauses.join(', ')}
            WHERE id = ?;
        `;

      await getPool().execute(query, values);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  static async Delete(id: string): Promise<void> {
    try {
      const [imageUrl] = await getPool().execute(
        `
        SELECT profile_picture_url FROM user WHERE id = ?;
      `,
        [id]
      );
      console.log(imageUrl)
      
      DeleteImage(imageUrl[0].profile_picture_url)

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
