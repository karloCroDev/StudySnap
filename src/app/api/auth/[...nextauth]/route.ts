// External packages
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { GetUserByEmail } from '../../database/pool';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;
        try {
          const user = await GetUserByEmail(email);
          if (!user) {
            return null;//what is it returning?
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
          else return null;

        } catch (error) {
          console.log('Error: ', error);
          return null;
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
    strategy: 'jwt' as 'jwt',
  },
  //add token expiry date and refresh
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
