import '@/app/styles/app.css';
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import { ToastProvider } from '@/utils/toast';
import AuthProvider from './lib/auth.provider';
import Providers from './lib/nprogressbar.wrapper';
import { TrackContextProvider } from './lib/track.wrapper';

export const metadata = {
  title: 'Soundcloud Clone',
  description: 'Soundcloud clone by QuyHP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Providers>
            <AuthProvider>
              <ToastProvider>
                <TrackContextProvider>{children}</TrackContextProvider>
              </ToastProvider>
            </AuthProvider>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
