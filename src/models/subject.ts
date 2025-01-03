import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/pool';

export class Subject {
    id: string;
    name: string;
    details: string;
    creator: string;
    image: string | null;

    constructor(
        name: string,
        details: string,
        creator: string,
        image: string | null = null,
        id: string = uuidv4()
    ) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.creator = creator;
        this.image = image;
    }

    async Insert(): Promise<void> {
        try {
            await pool.execute(
                `
        INSERT INTO subject (id, name, details, creator, image)
        VALUES (?, ?, ?, ?, ?);
      `,
                [this.id, this.name, this.details, this.creator, this.image]
            );
        } catch (err) {
            console.error('Error inserting subject:', err);
        }
    }

    static async Update(id: string, name: string, details: string): Promise<void> {
        try {
            await pool.execute(
                `
        UPDATE subject
        SET name = ?, details = ?
        WHERE id = ?;
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