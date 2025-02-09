import { getPool } from '../database/pool';

// Luka: I also need from document to get [creatorId, author] (user who created that document) and  [like count, liked]  from that note (what I mean is that we are updating the note like count, not seperate like action for document. so note NOT document)
export interface Dokument {
  id: string;
  title: string;
  content: string;
  note_id: string;
  creator_id: string;
  creator_name: string;
  like_count: number;
  liked: boolean;
}

export class DokumentClass {
  static async Insert(
    content: string,
    note_id: string
  ): Promise<string | null> {
    try {
      const [result]: any = await getPool().execute(
        `
            INSERT INTO document (content, note_id)
            VALUES (?, ?);
            `,
        [content, note_id]
      );
      return result.insertId as string;
    } catch (err) {
      console.error('Error inserting document:', err);
      return null;
    }
  }

  static async Update(
    content: string,
    id: string
  ): Promise<void> {
    try {
      await getPool().execute(
        `
      UPDATE document
          content = ?, date_modified = CURRENT_TIMESTAMP
      WHERE id = ?;
    `,
        // I put timestamp up on title and date, not on id, I was getting error
        [content, id]
      );
    } catch (err) {
      console.error('Error updating document:', err);
    }
  }
}
