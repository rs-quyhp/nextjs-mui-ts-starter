'use client';

import { AppProgressProvider } from '@bprogress/next';
import { Suspense } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <AppProgressProvider
        height="2px"
        color="#ccc"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </AppProgressProvider>
    </Suspense>
  );
};

export default Providers;
