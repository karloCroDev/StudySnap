// External packages
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Database
import { IsUsernameOrEmailTaken } from '@/db/auth/signup';

// Models
import { UserClass } from '@/models/user';

//Function to create a new user
export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          message: 'Insufficient data provided',
        },
        {
          status: 400,
        }
      );
    }
    // Check if the username or email is already taken
    if (await IsUsernameOrEmailTaken(username, email)) {
      return NextResponse.json(
        {
          message: 'Email already in use',
        },
        {
          status: 400,
        }
      );
    }
    // Hashing and salting the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserClass.Insert(username, email, hashedPassword);

    return NextResponse.json({ message: 'User registred' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Error occoured on server',
      },
      {
        status: 500,
      }
    );
  }
}
