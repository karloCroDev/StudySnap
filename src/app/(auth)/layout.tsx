// External packages
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Not allowing the user to register again if he is already logged in
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/home/subjects');
  }
  return children;
}
