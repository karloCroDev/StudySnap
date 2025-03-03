// Connection
import { getPool } from '@/lib/db/db';

export async function IsUsernameOrEmailTaken(
  username: string,
  email: string
): Promise<boolean> {
  const result: [Array<any>, any] = await getPool().query(
    `
        SELECT * FROM user WHERE username = ? OR email = ? LIMIT 1
    `,
    [username, email]
  );
  return result[0].length > 0;
}
