import ProfileTrack from '@/components/header/profile.track';
import { sendRequest } from '@/utils/api';
import { Container, Grid } from '@mui/material';

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
  const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/users`,
    method: 'POST',
    body: {
      id: params.slug,
    },
    nextOption: {
      next: { tag: ['track-by-user'] },
    },
  });

  const data = tracks.data?.result;
  console.log('Check user tracks: ', data);

  return (
    <Container sx={{ my: '24px' }}>
      <Grid container spacing={2}>
        {data?.map((track, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ProfileTrack track={track} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
