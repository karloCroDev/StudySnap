// External packages
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { MetaCard } from '@/components/ui/MetaCard';
import { SearchableHeader } from '@/components/ui/SearchableHeader';
import { CreateCard } from '@/components/ui/CreateCard';

// Images
import ImageExample from '@/public/images/login-image.png';

export default function Subjects() {
  return (
    <>
      <SearchableHeader title="Subjects" />
      <LayoutRow className="animate-card-initial-apperance mt-16 justify-center">
        <LayoutColumn lg={10}>
          <LayoutRow className="sm:-pr-4 pr-0">
            <LayoutColumn sm={6} lg={4} xl2={3} className="pr-4">
              <CreateCard type="subject" />
            </LayoutColumn>
            {[...Array(7)].map((_, i) => {
              if ((i + 1) % 2) {
                return (
                  <LayoutColumn sm={6} lg={4} xl2={3} className="pb-8 pr-4">
                    <MetaCard
                      title="Biology"
                      description="Lorem ipsum dolorem"
                      type="sujbects"
                      image={
                        <div className="absolute left-0 top-0 -z-10 h-full w-full">
                          <Image
                            src={ImageExample}
                            alt="Informative image about subject"
                            className="h-full object-cover brightness-50"
                          />
                        </div>
                      }
                    />
                  </LayoutColumn>
                );
              } else {
                return (
                  <LayoutColumn sm={6} lg={4} xl2={3} className="pb-8 pr-4">
                    <MetaCard
                      title="Biology"
                      description="Lorem ipsum dolorem"
                      type="notes"
                    />
                  </LayoutColumn>
                );
              }
            })}
          </LayoutRow>
        </LayoutColumn>
        <LayoutColumn lg={8}></LayoutColumn>
      </LayoutRow>
    </>
  );
}
