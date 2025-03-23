'use client';

// External packagess
import * as React from 'react';

export const useClientImage = (image: File) => {
  const clientImage = React.useMemo(
    () => image && URL.createObjectURL(image),
    [image]
  );
  return clientImage;
};
