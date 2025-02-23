// Etxernal packages
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';

// Back up if there is no user
export async function GET() {
  const cookieStore = cookies();
  let userId = cookieStore.get('uid')?.value;

  if (!userId) {
    userId = nanoid(); // Generate a new UUID
    cookieStore.set('uid', userId);
  }

  return NextResponse.json({ userId });
}
