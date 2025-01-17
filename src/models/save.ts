import { pool } from '../database/pool';

export class Saves {
    id: string;
    user_id: string;
    subject_id: string;

    constructor(user_id: string, subject_id: string) {
        this.id = user_id + subject_id;
        this.user_id = user_id;
        this.subject_id = subject_id;
    }

    async Insert(): Promise<void> {
        try {
            await pool.execute(
                `
        INSERT INTO saves (id, user_id, subject_id)
        VALUES (?, ?, ?);
      `,
                [this.id, this.user_id, this.subject_id]
            );
        } catch (err) {
            console.error('Error inserting save:', err);
        }
    }

    async Delete(): Promise<void> {
        try {
            await pool.execute(
                `
        DELETE FROM saves WHERE id = ?;
      `,
                [this.id]
            );
        } catch (err) {
            console.error('Error deleting save:', err);
        }
    }
}