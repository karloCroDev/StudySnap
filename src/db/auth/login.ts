// Database
import { getPool } from '@/db/db';
import { GetImage } from '@/db/imageHandler';

// Models
import { type User } from '@/models/user';

export async function GetUserByEmail(email: string): Promise<User | null> {
  const result: [any, any] = await getPool().query(
    `
        SELECT * FROM user WHERE email = ? LIMIT 1
    `,
    [email]
  );
  if (!result[0][0]) return null;
  result[0][0].encoded_image = await GetImage(result[0][0].profile_picture_url);
  return result[0][0] as User;
}
