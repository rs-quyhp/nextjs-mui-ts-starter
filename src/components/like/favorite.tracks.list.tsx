'use client';

import { convertSlugUrl } from '@/utils/api';
import { Container, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IProps {
  favoriteTracks: ITrackTop[] | undefined;
}

const FavoriteTracks = (props: IProps) => {
  const route = useRouter();
  const { favoriteTracks } = props;

  return (
    <Container
      sx={{
        my: '24px',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: 24,
        }}
      >
        Hear the track you've liked:
      </Typography>
      <Divider sx={{ marginTop: '24px', marginBottom: '24px' }}></Divider>
      <Grid
        container
        sx={{
          display: 'flex',
          gap: '24px',
        }}
      >
        {favoriteTracks?.map((track) => (
          <Grid
            item
            key={track._id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              onClick={() =>
                route.push(
                  `/track/${convertSlugUrl(track.title)}-${
                    track._id
                  }.html?audio=${track.trackUrl}`
                )
              }
              style={{
                cursor: 'pointer',
                width: '210px',
              }}
            >
              <Image
                alt={track.title}
                src={`${process.env.NEXT_PUBLIC_API_URL}/images/${track.imgUrl}`}
                width={210}
                height={210}
                style={{
                  objectFit: 'cover',
                }}
              />
              <Typography
                variant="h6"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {track.title}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoriteTracks;
