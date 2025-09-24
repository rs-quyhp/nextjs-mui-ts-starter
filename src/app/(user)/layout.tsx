import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import * as React from 'react';
import AuthProvider from '../lib/auth.provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <AppHeader />
            {children}
            <AppFooter />
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
