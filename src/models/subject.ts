// Database
import { getPool } from '@/db/db';
import { DeleteImage } from '@/db/imageHandler';

export interface Subject {
  id: number;
  name: string;
  date_created: Date;
  date_modified: Date;
  details: string;
  image_url: string | null;
  creator_id: string;
}

export class SubjectClass {
  static async Insert(
    name: string,
    details: string,
    creator: string,
    image: string | null
  ): Promise<string | null> {
    console.log(name, details, creator, image);
    try {
      console.log(creator);
      const [result]: any = await getPool().execute(
        `
            INSERT INTO subject ( name, details, creator_id, image_url)
            VALUES (?, ?, ?, ?);
        `,
        [name, details, creator, image]
      );
      return result.insertId as string;
    } catch (err) {
      console.error('Error inserting subject:', err);
      return null;
    }
  }

  static async Update(
    id: string,
    updates: { [key: string]: any }
  ): Promise<void> {
    try {
      // Updating all values in DB using paramters
      const setClauses: string[] = [];
      const values: any[] = [];

      for (const [key, value] of Object.entries(updates)) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }

      setClauses.push('date_modified = CURRENT_TIMESTAMP');

      values.push(id);

      const query = `
            UPDATE subject
            SET ${setClauses.join(', ')}
            WHERE id = ?;
        `;

      await getPool().execute(query, values);
    } catch (err) {
      console.error('Error updating subject:', err);
    }
  }

  static async Delete(id: string, imageUrl: string | null): Promise<void> {
    try {
      await getPool().execute(
        `
        DELETE FROM subject WHERE id = ?;
      `,
        [id]
      );
      await DeleteImage(imageUrl);
    } catch (err) {
      console.error('Error deleting subject:', err);
    }
  }
}
