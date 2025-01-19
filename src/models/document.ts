import { pool } from '../database/pool';

export interface Dokument{
    id: string,
    title: string,
    content: string,
    note_id: string,
}

export class DokumentClass {

    static async Insert(title: string, content: string, note_id: string): Promise<string | null> {
    try {
        const [result]: any = 
            await pool.execute(
                `
            INSERT INTO document (title, content, note_id)
            VALUES (?, ?, ?);
            `,
                [title, content, note_id]
            );
            return result.insertId as string
        } catch (err) {
            console.error('Error inserting document:', err);
            return null
        }
    }

    static async Update(title: string, content: string, id: string): Promise<void> {
        try {
            await pool.execute(
                `
        UPDATE document
        SET title = ?, content = ?
        WHERE id = ?, date_modified = CURRENT_TIMESTAMP;
      `,
                [title, content, id]
            );
        } catch (err) {
            console.error('Error updating document:', err);
        }
    }
}