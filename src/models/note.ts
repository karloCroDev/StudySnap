import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/pool';

export interface Note{
  id: string;
  title: string;
  details: string;
  is_public: boolean;
  subject_id: string;
  likes: number;
  liked: boolean
  creator_name: string;
}

export class NoteClass {
  static async Insert(title: string, details:  string, is_public: boolean, subject_id: string): Promise<void> {
    try {
      await pool.execute(
        `
        INSERT INTO note (title, details, is_public, subject_id)
        VALUES (?, ?, ?, ?);
      `,
        [title, details, is_public, subject_id]
      );
    } catch (err) {
      console.error('Error inserting note:', err);
    }
  }

  static async Update(title: string, details: string, is_public: boolean, id: string ): Promise<void> {
    try {
      await pool.execute(
        `
        UPDATE note
        SET title = ?, details = ?, is_public = ?
        WHERE id = ?;
      `,
        [title, details, is_public, id]
      );
    } catch (err) {
      console.error('Error updating note:', err);
    }
  }

  static async Delete(id: string): Promise<void> {
    try {
      await pool.execute(
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