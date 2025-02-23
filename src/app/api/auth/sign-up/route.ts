// External packages
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { IsUsernameOrEmailTaken } from '@/database/pool';
// Models
import  { UserClass }  from '@/models/user';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    
    if (!username || !email || !password) {
      return NextResponse.json({ status: 400, statusText: 'Insufficient data provided' });
    }
    if (await IsUsernameOrEmailTaken(username, email)) {
      return NextResponse.json({ status: 400, statusText: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserClass.Insert(username, email, hashedPassword)

    return NextResponse.json({ status: 201, statusText: 'User registred' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, statusText: 'Error occoured on server' });
  }
}
