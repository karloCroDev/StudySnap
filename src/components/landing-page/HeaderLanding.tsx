// Components
import { Layout } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

export const HeaderLanding = () => (
  <div className="fixed left-0 top-0 z-20 w-full bg-gray-100">
    <Layout>
      <nav className="flex h-24 items-center justify-between">
        <Logo className="lg:flex-1" />
        <ul className="hidden justify-center gap-12 text-md lg:flex lg:flex-1">
          <a href="#home">
            <li>Home</li>
          </a>
          <a href="#docs">
            <li>Docs</li>
          </a>
          <a href="#why-us">
            <li> Why us</li>
          </a>
          <a href="#FAQ">
            <li>FAQ</li>
          </a>
        </ul>
        <div className="flex gap-4 lg:flex-1 lg:justify-end">
          <LinkAsButton href="/login" colorScheme="white" variant="outline">
            Log in
          </LinkAsButton>
          <LinkAsButton
            href="/sign-up"
            colorScheme="light-blue"
            variant="outline"
            className="hidden sm:flex"
          >
            Sign up
          </LinkAsButton>
        </div>
      </nav>
    </Layout>
  </div>
);
