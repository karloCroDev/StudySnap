// Database
import { getPool } from '@/db/db';
import { noteCache } from '@/lib/algorithms/caching';
import { DeleteImage } from '@/db/imageHandler';

export interface Note {
  id: number;
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
  creator_id: number;

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
      const [result] = await getPool().execute(
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
      // Updating all values in DB using paramters
      const setClauses: string[] = [];
      const values: any[] = [];

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

  static async Delete(id: string, imageUrl: string | null): Promise<void> {
    try {
      await getPool().execute(
        `
        DELETE FROM note WHERE id = ?;
      `,
        [id]
      );
      await DeleteImage(imageUrl);
      noteCache.clear();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  }
}
