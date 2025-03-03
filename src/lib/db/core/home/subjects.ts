// Lib
import { getPool } from '@/lib/db/db';

//Models
import { Subject } from '@/models/subject';

// Database (handling the images)
import { GetImage } from '@/lib/db/imageHandler';

export async function GetSubjectByCreatorId(
  creatorId: string
): Promise<Array<Subject>> {
  const result: [any[], any] = await getPool().query(
    `
        SELECT * FROM subject WHERE creator_id = ?
    `,
    [creatorId]
  );
  const subjectsWithImages = await Promise.all(
    result[0].map(async (subject) => {
      const image = await GetImage(subject.image_url);
      return {
        ...subject,
        encoded_image: image,
      };
    })
  );
  return subjectsWithImages as Subject[];
}

export async function GetSubjectById(id: string): Promise<Subject> {
  const result: [any, any] = await getPool().query(
    `
        SELECT * FROM subject WHERE id = ? LIMIT 1
    `,
    [id]
  );
  result[0][0].encoded_image = await GetImage(result[0][0].image_url);
  return result[0][0] as Subject;
}
