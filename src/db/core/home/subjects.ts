// Database
import { getPool } from '@/db/db';

//Models
import { Subject } from '@/models/subject';

// Gets all subjects for the current user
export async function GetSubjectByCreatorId(
  creatorId: string
): Promise<Array<Subject>> {
  const result: [any[], any] = await getPool().query(
    `
        SELECT * FROM subject WHERE creator_id = ?
    `,
    [creatorId]
  );
  return result[0] as Subject[];
}

export async function GetSubjectById(id: string): Promise<Subject> {
  const result: [any, any] = await getPool().query(
    `
        SELECT * FROM subject WHERE id = ? LIMIT 1
    `,
    [id]
  );
  return result[0][0] as Subject;
}
