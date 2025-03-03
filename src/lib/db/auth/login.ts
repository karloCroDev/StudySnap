// Connection
import { getPool } from '@/lib/db/db';

//Models
import { User } from '@/models/user';

// Database (handling the images)
import { GetImage } from '@/lib/db/imageHandler';

export async function GetUserByEmail(email: string): Promise<User> {
  const result: [any, any] = await getPool().query(
    `
        SELECT * FROM user WHERE email = ? LIMIT 1
    `,
    [email]
  );
  result[0][0].encoded_image = await GetImage(result[0][0].profile_picture_url);
  return result[0][0] as User;
}
