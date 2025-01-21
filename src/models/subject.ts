import { getPool } from '../database/pool';

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
             const [result]: any = await getPool().execute(
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

    static async Update(id: string, updates: { [key: string]: any }): Promise<void> {
        try {
            let values = [];

            for (const [key, value] of Object.entries(updates)) {
                typeof value === 'number' ? values.push(`${key} = ${value}`) : values.push(`${key} = "${value}"`);
            }

            await getPool().execute(`
                UPDATE subject
                SET ${values.join(', ')}, date_modified = CURRENT_TIMESTAMP
                WHERE id = ${id};
            `);

        } catch (err) {
            console.error('Error updating subject:', err);
        }
    }



    static async Delete(id: string): Promise<void> {
        try {
            await getPool().execute(
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