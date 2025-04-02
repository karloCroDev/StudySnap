// Database
import { getPool } from '@/db/db';

// Models
import { type User } from '@/models/user';

export async function GetUserByEmail(email: string): Promise<User | null> {
  const result: [any, any] = await getPool().query(
    `
        SELECT * FROM user WHERE email = ? LIMIT 1
    `,
    [email]
  );

  return result[0][0] as User;
}
