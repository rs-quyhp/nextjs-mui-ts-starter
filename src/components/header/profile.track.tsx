'use client';

import { useTrackContext } from '@/app/lib/track.wrapper';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
          <Typography
            component="div"
            variant="h5"
            onClick={() =>
              route.push(`/track/${track._id}?audio=${track.trackUrl}`)
            }
            sx={{
              cursor: 'pointer',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {track.title}
          </Typography>
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
      <CardMedia
        component="img"
        sx={{ height: 155, objectFit: 'cover', width: 155 }}
        image={`${process.env.NEXT_PUBLIC_API_URL}/images/${track.imgUrl}`}
        alt={track.description}
      />
    </Card>
  );
};

export default ProfileTrack;
