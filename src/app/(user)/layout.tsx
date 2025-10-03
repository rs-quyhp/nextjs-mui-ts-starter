import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import { Box } from '@mui/material';
import * as React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
      <Box sx={{ marginBottom: '100px' }}></Box>
      <AppFooter />
    </>
  );
}
