'use client';
import { useTrackContext } from '@/app/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { AppBar, Box, Container } from '@mui/material';
import { useEffect, useRef } from 'react';
import {
  default as AudioPlayer,
  default as H5AudioPlayer,
} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const player = useRef<H5AudioPlayer>(null);
  const { currentTrack, setCurrentTrack } = useTrackContext() ?? {};

  useEffect(() => {
    console.log('Check track: ', currentTrack);
    if (player) {
      if (currentTrack?.isPlaying) {
        player.current?.audio?.current?.play();
      } else {
        player.current?.audio?.current?.pause();
      }
    }
  }, [currentTrack, player]);

  const onAudioPlayPause = (isPlaying: Boolean) => {
    if (setCurrentTrack && currentTrack?.isPlaying !== isPlaying) {
      setCurrentTrack((prevTrack: ITrackContext) => ({
        ...prevTrack,
        isPlaying: isPlaying,
      }));
    }
  };

  if (!hasMounted) return <></>;

  return (
    <div style={{ marginTop: 100 }}>
      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: 0, background: '#f2f2f2' }}
      >
        <Container
          sx={{
            display: 'flex',
            gap: 10,
            '.rhap_main, .rhap_controls-section': {
              gap: '30px',
            },
          }}
        >
          <AudioPlayer
            ref={player}
            src={`${process.env.NEXT_PUBLIC_API_URL}/tracks/${
              currentTrack ? currentTrack.trackUrl : 'hoidanit.mp3'
            }`}
            volume={0.5}
            style={{
              background: '#f2f2f2',
              boxShadow: 'unset',
            }}
            layout="horizontal-reverse"
            onPlay={() => onAudioPlayPause(true)}
            onPause={() => onAudioPlayPause(false)}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'start',
              minWidth: 100,
            }}
          >
            <div style={{ color: '#ccc' }}>QuyHP</div>
            <div style={{ color: 'black' }}>Who am I</div>
          </Box>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppFooter;
