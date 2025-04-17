// External packages
import NextAuth from 'next-auth';

// Lib
import { authOptions } from '@/lib/auth';

// Create a NextAuth handler with the specified options
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
