// External packages
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { IsUsernameOrEmailTaken } from '../../database/pool.js';
// Models
import { User } from '@/models/models';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!username || !email || !password) {
      return NextResponse.json('Insufficient data provided', { status: 200 });
    }
    if (await IsUsernameOrEmailTaken(username)) {
      return NextResponse.json('Username or email is already taken', { status: 200 });
    }
    await new User(username, email, hashedPassword).Insert()
    return NextResponse.json('User registred', { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to sign up', { status: 500 });
  }
}
