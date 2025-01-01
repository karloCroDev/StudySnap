// External packages
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { IsUsernameOrEmailTaken } from '../../database/pool';
// Models
import { User } from '@/models/models';

export async function POST(req: Request) {
  try {
    const { username, full_name, email, password } = await req.json();
    console.log(username, full_name, email, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    // 10 is the number of rounds to generate the salt
    if (!username || !email || !password) {
      return NextResponse.json('Insufficient data provided', { status: 200 });
    }
    if (await IsUsernameOrEmailTaken(username)) {
      return NextResponse.json('Username or email is already taken', { status: 200 });
    }
    await new User(username, "full_name", email, hashedPassword).Insert()
    return NextResponse.json('User registred', { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to sign up', { status: 500 });
  }
}
