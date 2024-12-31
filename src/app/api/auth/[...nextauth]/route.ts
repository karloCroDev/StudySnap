// Etxternal packages
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Models
import { User } from '@/models/user';

// Libs
import { connectMongoDB } from '@/lib/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          console.log(user);
          if (!user) {
            return;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        } catch (error) {
          console.log('Error: ', error);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.image = token.image;
        session.user.name = token.username;
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.image = user.image;
        token.name = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt' as 'jwt', // For auth options this must be seted
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
