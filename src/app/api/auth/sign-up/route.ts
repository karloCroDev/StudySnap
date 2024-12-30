// External packages
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// libs
import { connectMongoDB } from '@/libs/db';

// Models
import { User } from '@/models/user';

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    // 10 is the number of rounds to generate the salt
    await connectMongoDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json('Email already in use.', { status: 400 });
    }
    await User.create({ username, email, password: hashedPassword });
    return NextResponse.json('User registred', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Failed to sign up', { status: 500 });
  }
}
