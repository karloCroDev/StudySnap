// Database
import { getPool } from '@/database/pool';

export class LikeClass {
  static async Insert(user_id: string, note_id: string): Promise<void> {
    try {
      await getPool().execute(
        `
        INSERT INTO likes (user_id, note_id)
        VALUES (?, ?);
      `,
        [user_id, note_id]
      );
    } catch (err) {
      console.error('Error inserting like:', err);
    }
  }
  static async Delete(user_id: string, note_id: string): Promise<void> {
    try {
      await getPool().execute(
        `
        DELETE FROM likes where user_id = ? and note_id = ?
      `,
        [user_id, note_id]
      );
    } catch (err) {
      console.error('Error inserting like:', err);
    }
  }
}
