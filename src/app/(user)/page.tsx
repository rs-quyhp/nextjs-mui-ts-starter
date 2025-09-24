import MainSlider from '@/components/main/main.slider';
import { sendRequest } from '@/utils/api';
import { Container } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log('Check server session: ', session);

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 10,
    },
  });

  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'WORKOUT',
      limit: 10,
    },
  });

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'PARTY',
      limit: 10,
    },
  });

  return (
    <Container>
      <MainSlider title="Top Chills" data={chills?.data ?? []} />
      <MainSlider title="Top Workout" data={workout?.data ?? []} />
      <MainSlider title="Top Party" data={party?.data ?? []} />
    </Container>
  );
}
