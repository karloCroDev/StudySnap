import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/pool';

export class Document {
    id: string;
    title: string;
    content: string;
    note_id: string;

    constructor(
        title: string,
        content: string,
        note_id: string,
        id: string = uuidv4()
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.note_id = note_id;
    }

    async Insert(): Promise<void> {
        try {
            await pool.execute(
                `
        INSERT INTO document (id, title, content, note_id)
        VALUES (?, ?, ?, ?);
      `,
                [this.id, this.title, this.content, this.note_id]
            );
        } catch (err) {
            console.error('Error inserting document:', err);
        }
    }

    async Update(): Promise<void> {
        try {
            await pool.execute(
                `
        UPDATE document
        SET title = ?, content = ?, note_id = ?
        WHERE id = ?;
      `,
                [this.title, this.content, this.note_id, this.id]
            );
        } catch (err) {
            console.error('Error updating document:', err);
        }
    }

    async Delete(): Promise<void> {
        try {
            await pool.execute(
                `
        DELETE FROM document WHERE id = ?;
      `,
                [this.id]
            );
        } catch (err) {
            console.error('Error deleting document:', err);
        }
    }
}