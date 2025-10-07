'use client';

import { useTrackContext } from '@/app/lib/track.wrapper';
import { convertSlugUrl } from '@/utils/api';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IProp {
  track: ITrackTop;
}

const ProfileTrack = (props: IProp) => {
  const theme = useTheme();
  const route = useRouter();
  const { currentTrack, setCurrentTrack } = useTrackContext() ?? {};
  const { track } = props;

  const onClickPlay = () => {
    if (setCurrentTrack)
      setCurrentTrack((prevTrack: IShareTrack) => ({
        ...track,
        isPlaying:
          prevTrack?.trackUrl === track.trackUrl ? !prevTrack.isPlaying : true,
      }));
  };

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Link
            href={`/track/${convertSlugUrl(track.title)}-${
              track._id
            }.html?audio=${track.trackUrl}`}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textDecoration: 'unset',
              color: '#000000',
              fontSize: '25px',
              fontWeight: '400',
            }}
          >
            {track.title}
          </Link>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {track.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={onClickPlay}>
            {currentTrack?.isPlaying &&
            currentTrack.trackUrl === track.trackUrl ? (
              <Pause sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrow sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
          </IconButton>
        </Box>
      </Box>
      <Image
        alt={track.description ?? 'track description'}
        src={`${process.env.NEXT_PUBLIC_API_URL}/images/${track.imgUrl}`}
        width={160}
        height={160}
        style={{
          objectFit: 'cover',
        }}
      />
    </Card>
  );
};

export default ProfileTrack;
