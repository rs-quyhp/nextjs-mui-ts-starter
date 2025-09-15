import MainSlider from '@/components/main/main.slider';
import { sendRequest } from '@/utils/api';
import { Container } from '@mui/material';
import * as React from 'react';

export default async function HomePage() {
  const res = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 1,
    },
  });

  console.log('Check res data ts: ', res.data);

  return (
    <Container>
      <MainSlider />
      <MainSlider />
      <MainSlider />
    </Container>
  );
}
