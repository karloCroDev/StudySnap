// External packages
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";

// Lib
import { GetUserByEmail } from '@/lib/db/auth/login';
import { Account, Profile, User } from 'next-auth';
import { UserClass } from '@/models/user';


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
    
    //Provides google/email login to the website
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  callbacks: {
    // Callback to create token for communication
    jwt: async ({ token, user, session, trigger }: any) => {
      // Update token with session name if triggered by 'update'
      if (trigger === 'update' && session?.name) {
        token.name = session.name;
      }
      if (trigger === 'update' && session?.image) {
        token.image = session.image;
      }
      if (user) {
        let myUser = await GetUserByEmail(user.email)
        token.uid = myUser!.id;
        token.sub = myUser!.id;
        token.image = myUser!.encoded_image || '';
        token.name = myUser!.username
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // Token expires in 24 hours
      }

      return token;
    },

    // Callback to create session from token
    session: async ({ session, token }: any) => {
      // Update session with token details
      if (session?.user) {
        session.user.id = token.sub;
        session.user.image = token.image || '';
        session.user.name = token.name;
      }
      return session;
    },

    //Handles sign in and sign up for authentication via gmail
    async signIn({ user, account, profile, credentials }: { 
      user: User;  
      account: Account | null; 
      profile?: Profile | null; 
      credentials?: Record<string, any> | null;
    }) {
      //Account must be provided to continue
      if (!account) return false;

      //Logic for creating a user if he does not exist
      if (account.provider === "google") {
        const existingUser = await GetUserByEmail(user.email!)
        if (!existingUser) {
          await UserClass.Insert(user.name!, user.email!, "SignedUpViaGoogle")
        }
        return true
      }

      if (account.provider === "credentials") {
        return true;
      }

      return false;  
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

