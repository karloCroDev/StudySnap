// Components
import { Layout } from '@/components/ui/Layout';
import { Logo } from '@/components/ui/Logo';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

export const HeaderLanding = () => {
  return (
    <div className="fixed left-0 top-0 w-full bg-gray-100">
      <Layout>
        <nav className="flex h-24 items-center justify-between">
          <Logo className="flex-1" />
          <ul className="flex flex-1 justify-center gap-12 text-md">
            <a href="#home">
              <li>Home</li>
            </a>
            <a href="#docs">
              <li>Docs</li>
            </a>
            <a href="#pricing">
              <li>Pricing</li>
            </a>
            <a href="#why-us">
              <li> Why us</li>
            </a>
          </ul>
          <div className="flex flex-1 justify-end gap-4">
            <LinkAsButton href="/login" colorScheme="white" variant="outline">
              Log in
            </LinkAsButton>
            <LinkAsButton
              href="/sign-up"
              colorScheme="light-blue"
              variant="outline"
            >
              Sign up
            </LinkAsButton>
          </div>
        </nav>
      </Layout>
    </div>
  );
};
