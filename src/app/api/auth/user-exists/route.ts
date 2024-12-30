// External packages
import { NextResponse } from 'next/server';

// Models
import { User } from '@/models/user';

// Libs
import { connectMongoDB } from '@/libs/db';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await connectMongoDB();
    const user = await User.findOne({ email }).select('_id');

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
  }
}
