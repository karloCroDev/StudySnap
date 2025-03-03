// Lib
import { getPool } from '@/lib/db/db';
import { noteCache } from '@/lib/db/caching';

export interface Note {
  id: string;
  title: string;
  details: string | null;
  content: string | null;
  is_public: boolean;
  subject_id: string;
  date_created: Date;
  date_modified: Date;

  likes: number;
  liked: number;
  creator_name: string;
  creator_id: string;

  image_url: string | null;
  encoded_image: string | null;
  profile_image_url: string | null;
  encoded_profile_image: string | null;
}

export class NoteClass {
  static async Insert(
    title: string,
    details: string,
    is_public: boolean,
    subject_id: string,
    imagePath: string | null = null
  ): Promise<string | null> {
    try {
      const [result]: any = await getPool().execute(
        `
        INSERT INTO note (title, details, is_public, subject_id, image_url)
        VALUES (?, ?, ?, ?, ?);
      `,
        [title, details, is_public, subject_id, imagePath]
      );

      noteCache.clear();

      return result.insertId as string;
    } catch (err) {
      console.error('Error inserting note:', err);
      return null;
    }
  }

  static async Update(
    id: string,
    updates: { [key: string]: any }
  ): Promise<void> {
    try {
      // Updating DB using paramters
      let setClauses: string[] = [];
      let values: any[] = [];

      for (const [key, value] of Object.entries(updates)) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }

      // Add timestamp update
      setClauses.push('date_modified = CURRENT_TIMESTAMP');

      // Ensure `id` is safely parameterized
      values.push(id);

      const query = `
            UPDATE note
            SET ${setClauses.join(', ')}
            WHERE id = ?;
        `;

      await getPool().execute(query, values);

      // Clear cache after a successful update
      noteCache.clear();
    } catch (err) {
      console.error('Error updating note:', err);
    }
  }

  static async Delete(id: string): Promise<void> {
    try {
      await getPool().execute(
        `
        DELETE FROM note WHERE id = ?;
      `,
        [id]
      );
      noteCache.clear();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  }
}
