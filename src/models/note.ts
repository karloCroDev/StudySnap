import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/pool';

export class Note {
  id: string;
  title: string;
  details: string;
  is_public: boolean;
  subject_id: string;

  constructor(
    title: string,
    details: string,
    is_public: boolean,
    subject_id: string,
    id: string = uuidv4()
  ) {
    this.id = id;
    this.title = title;
    this.details = details;
    this.is_public = is_public;
    this.subject_id = subject_id;
  }

  async Insert(): Promise<void> {
    try {
      await pool.execute(
        `
        INSERT INTO note (id, title, details, is_public, subject_id)
        VALUES (?, ?, ?, ?, ?);
      `,
        [this.id, this.title, this.details, this.is_public, this.subject_id]
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
        [title, details,is_public,id]
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