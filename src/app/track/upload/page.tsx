import UploadTabs from '@/components/track/upload.tabs';
import { Container } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload a new track',
  description: 'Upload new track by you',
};

const UploadTrackPage = () => {
  return (
    <Container sx={{ marginTop: '12px' }}>
      <UploadTabs />
    </Container>
  );
};

export default UploadTrackPage;
