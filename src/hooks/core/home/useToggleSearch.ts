'use client';

// External packages
import * as React from 'react';

// Mobile only animations and access to search
export const useToggleSearch = () => {
  const infoHeader = React.useRef<HTMLDivElement | null>(null);
  const toggleSearch = () => {
    const searchElement = infoHeader.current;

    if (searchElement) {
      const currentValue = searchElement.getAttribute('data-search-visible');
      const newValue = currentValue === 'true' ? 'false' : 'true';
      searchElement.setAttribute('data-search-visible', newValue);
    }
  };

  return { toggleSearch, infoHeader };
};
