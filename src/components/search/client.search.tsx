'use client';

import { convertSlugUrl, sendRequest } from '@/utils/api';
import { Box, Container, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClientSearch = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') as string;
  const [tracks, setTracks] = useState<ITrackTop[]>();

  const searchTrack = async () => {
    const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/search`,
      method: 'POST',
      body: {
        current: 1,
        pageSize: 100,
        title: query,
      },
      nextOption: {
        next: { tag: ['search-by-user'] },
      },
    });

    console.log('Check search track: ', res);

    if (res.data?.result) {
      setTracks(res.data.result);
    }
  };

  useEffect(() => {
    if (query) {
      document.title = `"${query}" on Soundcloud Clone`;

      searchTrack();
    }
  }, [query]);

  return (
    <Container sx={{ my: '24px' }}>
      <Typography>
        {tracks && tracks.length
          ? 'Search results for keyword:'
          : 'No results for keyword:'}{' '}
        <Box fontWeight="fontWeightMedium" display="inline">
          {query}
        </Box>
      </Typography>
      <Divider sx={{ marginTop: '24px', marginBottom: '24px' }}></Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          justifyContent: 'flex-start',
        }}
      >
        {tracks?.map((track) => (
          <Box
            key={track._id}
            sx={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <Image
              alt={track.title}
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/${track.imgUrl}`}
              width={96}
              height={96}
              style={{
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <Link
              href={`/track/${convertSlugUrl(track.title)}-${
                track._id
              }.html?audio=${track.trackUrl}`}
              style={{
                textDecoration: 'unset',
                color: 'black',
                fontWeight: '500',
              }}
            >
              {track.title}
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ClientSearch;
