import UploadTabs from '@/components/track/upload.tabs';
import { Container } from '@mui/material';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Upload a new track',
  description: 'Upload new track by you',
};

const UploadTrackPage = async () => {
  return (
    <Container sx={{ marginTop: '12px' }}>
      <Suspense fallback={null}>
        <UploadTabs />
      </Suspense>
    </Container>
  );
};

export default UploadTrackPage;
