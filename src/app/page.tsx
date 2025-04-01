// External packages
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

// Components
import { HeaderLanding } from '@/components/landing-page/HeaderLanding';
import { Layout, LayoutColumn } from '@/components/ui/Layout';
import { LinkAsButton } from '@/components/ui/LinkAsButton';

// Lib
import { plus_jakarta_sans } from '@/lib/fonts';

export default async function LandingPage() {
  return (
    <>
      <HeaderLanding />
      <Layout className="mt-20 lg:mt-36 2xl:mt-44">
        <LayoutColumn
          xs={12}
          lg={8}
          className="mx-auto flex flex-col items-center text-center"
        >
          <h1 className="text-balance text-9xl font-semibold">
            Take your studies to the next level with{' '}
            <span
              className={twMerge(
                plus_jakarta_sans.className,
                '!italic text-blue-400'
              )}
            >
              StudySnap
            </span>
          </h1>
          <p className="mt-8 text-balance text-md text-gray-400">
            A student-focused note-taking app powered by AI. Whether you're in
            class, at the library, or studying from home, our app helps you
            effortlessly capture and organize study materials.
          </p>
          <LinkAsButton
            href="login"
            rounded="full"
            size="lg"
            className="mx-auto mt-6 w-fit"
          >
            Get started
          </LinkAsButton>
        </LayoutColumn>
        <LayoutColumn lg={6} xs={12} className="mx-auto mt-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-blue-900">
            <Image
              src="/images/note-editor.png"
              alt="Representation of our application"
              className="h-full w-full object-cover"
              fill
            />
          </div>
        </LayoutColumn>
        <h2 className="mt-24 text-4xl font-semibold underline underline-offset-4">
          Lets dive deep
        </h2>
        <div className="relative mt-8 flex items-center justify-center gap-16 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="absolute -top-5 left-0 z-10 h-20 w-full rounded-[50%] bg-gray-100" />

          <div className="animate-infinite-scroll flex gap-16">
            {[...Array(6)].map((_, i) => (
              <div className="relative aspect-[9/16] h-96" key={i}>
                <Image
                  src="/images/login-image.png"
                  alt="Representation of our application"
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
            ))}
          </div>

          <div className="animate-infinite-scroll flex gap-16">
            {[...Array(6)].map((_, i) => (
              <div className="relative aspect-[9/16] h-96" key={i}>
                <Image
                  src="/images/login-image.png"
                  alt="Representation of our application"
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
            ))}
          </div>

          <div className="absolute -bottom-5 left-0 z-10 h-20 w-full rounded-[50%] bg-gray-100" />
        </div>
      </Layout>
    </>
  );
}
