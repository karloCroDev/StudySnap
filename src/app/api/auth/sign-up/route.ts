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
      return NextResponse.json('Insufficient data provided', { status: 200 });
    }
    if (await IsUsernameOrEmailTaken(username, email)) {
      return NextResponse.json('Email already in use.', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserClass.Insert(username, email, hashedPassword, null)

    return NextResponse.json('User registred', { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to sign up', { status: 500 });
  }
}
