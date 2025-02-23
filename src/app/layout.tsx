// External packages
import { twJoin } from 'tailwind-merge';

// Fonts
import { poppins } from '@/lib/fonts';

//Global styles
import './globals.css';

// Components
import { Toast } from '@/components/ui/Toast';
import { AuthProvider } from '@/components/ui/AuthWrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twJoin(poppins.className, 'bg-gray-100')}>
        <AuthProvider>{children}</AuthProvider>
        <Toast />
      </body>
    </html>
  );
}
