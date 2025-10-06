'use client';

import { sendRequest } from '@/utils/api';
import { Favorite, PlayArrow } from '@mui/icons-material';
import { Box, Chip, Container } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IProps {
  track: ITrackTop | undefined;
}

const LikeTrack = (props: IProps) => {
  const session = useSession();
  const [isTrackLiked, setIsTrackLiked] = useState(false);
  const [likedTracks, setLikedTracks] = useState<ITrackTop[]>([]);
  const { track } = props;

  const onLikeClick = async () => {
    setIsTrackLiked(!isTrackLiked);

    const res = await sendRequest<IBackendRes<ITrackTop>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.data?.access_token}`,
      },
      body: {
        track: track?._id,
        quantity: isTrackLiked ? -1 : 1,
      },
    });

    if (res.data) {
      getLikedTracks();
    }
  };

  const getLikedTracks = async () => {
    if (track && session.data?.access_token) {
      console.log('Check track: ', track);
      const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.data?.access_token}`,
        },
      });

      console.log('Check like res: ', res);
      if (res.data?.result) {
        const likedTracks = res.data.result;

        const trackLiked = likedTracks.some((t) => t._id === track?._id);
        console.log('Check track liked: ', trackLiked);
        setIsTrackLiked(trackLiked);
        setLikedTracks(likedTracks);
      }
    }
  };

  // Check if the track is liked
  useEffect(() => {
    getLikedTracks();
  }, [track, session]);

  return (
    <Container
      disableGutters
      sx={{ display: 'flex', padding: '12px', justifyContent: 'space-between' }}
    >
      <Chip
        icon={<Favorite color={isTrackLiked ? 'error' : 'action'} />}
        label={isTrackLiked ? 'Liked' : 'Like'}
        variant="outlined"
        sx={{
          borderRadius: '5px',
        }}
        color={isTrackLiked ? 'error' : 'default'}
        onClick={onLikeClick}
      />
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
        }}
      >
        <Chip
          icon={<PlayArrow color="disabled" />}
          label={
            likedTracks.find((t) => t._id === track?._id)?.countPlay ??
            track?.countPlay
          }
          sx={{
            border: 'unset',
          }}
          variant="outlined"
        />
        <Chip
          icon={<Favorite color="disabled" />}
          label={
            likedTracks.find((t) => t._id === track?._id)?.countLike ??
            track?.countLike
          }
          sx={{
            border: 'unset',
          }}
          variant="outlined"
        />
      </Box>
    </Container>
  );
};

export default LikeTrack;
