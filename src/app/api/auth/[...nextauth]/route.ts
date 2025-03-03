// External packages
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Lib
import { GetUserByEmail } from '@/lib/db/auth/login';

// Configuration options for NextAuth
export const authOptions = {
  providers: [
    // Credentials provider for authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      // Function to authorize users based on credentials
      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          if (!email || !password) return null;

          const user = await GetUserByEmail(email);
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
          else return null;
        } catch (error) {
          console.error('Error: ', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Callback to handle JWT token
    jwt: async ({ token, user, session, trigger }: any) => {
      // Update token with session name if triggered by 'update'
      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }
      // Update token with session image if triggered by 'update'
      if (trigger === 'update' && session?.image) {
        token.image = session.image;
      }
      // If user is present, update token with user details
      if (user) {
        token.uid = user.id;
        token.image = user.image || '';
        token.name = user.username;
      }
      return token;
    },

    // Callback to handle session
    session: async ({ session, token }: any) => {
      // Update session with token details
      if (session?.user) {
        session.user.id = token.sub;
        session.user.image = token.image || '';
        session.user.name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt' as 'jwt', // Use JWT strategy for sessions
  },

  secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
  pages: {
    signIn: '/',
  },
};

// Create a NextAuth handler with the specified options
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
