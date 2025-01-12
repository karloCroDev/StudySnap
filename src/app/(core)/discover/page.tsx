// External packages
import Image from 'next/image';

// Components
import { LayoutColumn, LayoutRow } from '@/components/ui/Layout';
import { DiscoverMapping } from '@/components/core/discover/DiscoverMapping';
import { SearchableHeader } from '@/components/ui/SearchableHeader';

// Images
import ImageExample from '@/public/images/login-image.png';

export default function Disover() {
  return (
    <>
      <SearchableHeader title="Discover" />
      <LayoutRow className="mt-8 animate-card-initial-apperance justify-center xl:mt-12">
        <LayoutColumn xs={11} lg={10}>
          <LayoutRow className="sm:-mr-4">
            <DiscoverMapping />
          </LayoutRow>
        </LayoutColumn>
      </LayoutRow>
    </>
  );
}
