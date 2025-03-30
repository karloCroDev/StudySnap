// External packages
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

// This part is for fixing the default types, when using useSession. It works without this (but ts is signalizing error in editor)
declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      image: string;
    };
  }
}
