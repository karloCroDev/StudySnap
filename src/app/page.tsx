// External packages
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { FilePlusIcon } from '@radix-ui/react-icons';
import { type Metadata } from 'next';

// Components
import { HeaderLanding } from '@/components/landing-page/HeaderLanding';
import { Layout, LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { LinkAsButton } from '@/components/ui/LinkAsButton';
import { FAQAccordion } from '@/components/landing-page/FAQAccordion';
import { Table } from '@/components/landing-page/Table';

// Lib
import { plus_jakarta_sans } from '@/lib/fonts';

// Metadata
export const metadata: Metadata = {
  title: 'StudySnap',
  description:
    'Explore the wonderlands of users notes, that will boost your studies to the sky 🚀',
  openGraph: {
    title: 'StudySnap welcome page',
    description:
      'Explore the wonderlands of users notes, that will boost your studies to the sky 🚀',
    siteName: 'StudySnap',
    images: {
      url: '/images/favicon-logo.png',
    },
  },
};

const imageShowroom = [
  '/images/public-profile-mobile.png',
  '/images/notes-mobile.png',
  '/images/subjects-mobile.png',
  '/images/discover-mobile.png',
  '/images/note-editor-mobile.png',
  '/images/note-editor-quizz.png',
];

export default async function LandingPage() {
  return (
    <>
      <HeaderLanding />
      <Layout className="mt-28 animate-show lg:mt-36 2xl:mt-44" id="home">
        <LayoutColumn
          xs={12}
          lg={8}
          className="mx-auto flex flex-col items-center text-center"
        >
          <h1 className="text-balance text-4xl font-semibold lg:text-7xl xl:text-9xl">
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
          <p className="mt-8 text-balance text-sm text-gray-400 md:text-md xl:text-md">
            A student-focused note-taking app powered by AI. Whether you&apos;re
            in class, at the library, or studying from home, our app helps you
            effortlessly capture and organize study materials.
          </p>
          <LinkAsButton
            href="/sign-up"
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
        <LayoutRow className="mt-12 flex flex-col justify-between lg:flex-row xl:mt-24">
          <LayoutColumn xs={12} lg={5}>
            <h3 className="text-xl font-medium lg:text-3xl">
              We believe that interactive learning from your notes is a{' '}
              <strong>must</strong>
            </h3>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-6 lg:mt-16">
            <p>
              Welcome to StudySnap, where we believe that writing the note
              should be effortlessly intertwined. Our mission is to help you
              create faster, more beautiful and more concise notes with power of
              AI.
            </p>
            <p className="mt-6">
              Also if you don&apos;t feel like writing notes, you can always
              discover the notes from others, while in the same time making sure
              to learn from them, while fully understanding the subject
            </p>
          </LayoutColumn>
        </LayoutRow>
        <div className="relative mt-8 flex items-center justify-center gap-16 overflow-hidden lg:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="absolute -top-8 left-0 z-10 hidden h-20 w-full rounded-[50%] bg-gray-100 lg:block" />

          <div className="flex animate-infinite-scroll gap-16">
            {imageShowroom.map((localImagePath, i) => (
              <div
                className="relative aspect-[9/16] h-96 rounded bg-gray-900"
                key={i}
              >
                <Image
                  src={localImagePath}
                  alt="Representation of our application"
                  className="h-full w-full object-contain"
                  fill
                />
              </div>
            ))}
          </div>

          <div className="flex animate-infinite-scroll gap-16">
            {imageShowroom.map((localImagePath, i) => (
              <div
                className="relative aspect-[9/16] h-96 rounded bg-gray-900"
                key={i}
              >
                <Image
                  src={localImagePath}
                  alt="Representation of our application"
                  className="h-full w-full object-contain"
                  fill
                />
              </div>
            ))}
          </div>

          <div className="absolute -bottom-8 left-0 z-10 hidden h-20 w-full rounded-[50%] bg-gray-100 lg:block" />
        </div>
        <p className="mt-4 text-center text-md text-gray-400">
          Explore more from the StudySnap ecosystem
        </p>
        <h2
          className={twMerge(
            'mt-12 text-2xl font-semibold !italic underline underline-offset-4',
            plus_jakarta_sans.className
          )}
          id="docs"
        >
          Docs
        </h2>

        <LayoutRow className="mt-8 flex flex-col justify-between lg:mt-16 lg:flex-row lg:items-center">
          <LayoutColumn xs={12} lg={5}>
            <h3 className="text-xl font-medium lg:text-3xl" id="docs">
              The key of undertanding the application is the{' '}
              <strong>documentation</strong>
            </h3>
          </LayoutColumn>
          <LayoutColumn xs={12} lg={6} className="mt-8 lg:mt-0">
            {/* Karlo: dodaj link na dokumentaciju */}
            <a
              href="https://drive.google.com/file/d/121F8_3EkzVVeyA1B5lQ2RA0Ik1YZHsSr/view?usp=drive_link"
              target="_blank"
              className="mt-6 text-center text-blue-400 lg:mt-0"
            >
              <FilePlusIcon className="mx-auto size-36" />
              <p className="mt-4 text-lg font-semibold">
                Download StudySnap documentation
              </p>
            </a>
          </LayoutColumn>
        </LayoutRow>
        <h2
          className={twMerge(
            'mt-12 text-2xl font-semibold !italic underline underline-offset-4',
            plus_jakarta_sans.className
          )}
          id="why-us"
        >
          Why us
        </h2>
        <LayoutColumn lg={8} xl2={6} xs={12} className="mx-auto mt-8 lg:mt-16">
          <Table />
        </LayoutColumn>
        <h2
          className={twMerge(
            'mt-12 text-2xl font-semibold !italic underline underline-offset-4',
            plus_jakarta_sans.className
          )}
          id="FAQ"
        >
          FAQ
        </h2>
        <LayoutColumn
          lg={6}
          xs={12}
          id="FAQ"
          className="mx-auto mt-8 pb-20 lg:mt-16"
        >
          <FAQAccordion />
        </LayoutColumn>
      </Layout>
    </>
  );
}
