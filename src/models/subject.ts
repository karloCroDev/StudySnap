import { pool } from '../database/pool';

export interface Subject{
    id: string,
    name: string,
    date_created: Date,
    date_modified: Date,
    details: string,
    image: string | null,
    creator_id: string,
}

export class SubjectClass {
    static async Insert(name: string, details: string, creator: string, image: string | null,): Promise<string | null> {
         try {
            const [result]: any  = await pool.execute(
                `
        INSERT INTO subject ( name, details, creator, image)
        VALUES (?, ?, ?, ?);
      `,
                [name, details, creator, image]
            );
            return result.insertId as string
        } catch (err) {
            console.error('Error inserting subject:', err);
            return null
        }
    }

    static async Update(id: string, name: string, details: string): Promise<void> {
        try {
            await pool.execute(
                `
        UPDATE subject
        SET name = ?, details = ?
        WHERE id = ?, date_modified = CURRENT_TIMESTAMP;
      `,
                [name, details, id]
            );
        } catch (err) {
            console.error('Error updating subject:', err);
        }
    }

    static async Delete(id: string): Promise<void> {
        try {
            await pool.execute(
                `
        DELETE FROM subject WHERE id = ?;
      `,
                [id]
            );
        } catch (err) {
            console.error('Error deleting subject:', err);
        }
    }
}