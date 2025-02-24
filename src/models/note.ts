import { getPool } from '../database/pool';

export interface Note{
  id: string;
  title: string;
  details: string | null;
  content: string | null;
  is_public: boolean;
  subject_id: string;

  likes: number;
  liked: boolean
  creator_name: string;
  creator_id: string;

  image_url: string | null;
  encoded_image: string | null;
  profile_image_url: string | null;
  encoded_profile_image: string | null;
}

export class NoteClass {
  static async Insert(title: string, details:  string, is_public: boolean, subject_id: string, imagePath: string | null = null): Promise<string | null> {
    try {
      const [result]: any = await getPool().execute(
        `
        INSERT INTO note (title, details, is_public, subject_id, image_url)
        VALUES (?, ?, ?, ?, ?);
      `,
        [title, details, is_public, subject_id, imagePath]
      );
      return result.insertId as string
    } catch (err) {
      console.error('Error inserting note:', err);
      return null
    }
  }

  static async Update(id: string, updates: { [key: string]: any }): Promise<void> {
    try {
      let values = []
      for (const [key, value] of Object.entries(updates)) {
        typeof value === 'number' ? values.push(`${key} = ${value}`) : values.push(`${key} = "${value}"`);
      }
      await getPool().execute(`
        UPDATE note
        SET ${values.join(', ')}, date_modified = CURRENT_TIMESTAMP
        WHERE id = ${id};
      `);
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
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  }
}