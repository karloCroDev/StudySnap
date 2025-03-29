// Database
import { getPool } from '@/db/db';

//Models
import { Subject } from '@/models/subject';

// Database (handling the images)
import { GetImage } from '@/db/imageHandler';

// Gets all subjects for the current user
export async function GetSubjectByCreatorId(
  creatorId: string,
  filter: string
): Promise<Array<Subject>> {
  filter = `%${filter}%`;
  const result: [any[], any] = await getPool().query(
    `
        SELECT * FROM subject WHERE creator_id = ? AND (name LIKE ? OR details LIKE ?)
    `,
    [creatorId, filter, filter]
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
