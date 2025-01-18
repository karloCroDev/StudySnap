// External packages
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

// This part is for fixing the default types, when using useSession. It works without this (but ts is signalizing this without any correct reason)
