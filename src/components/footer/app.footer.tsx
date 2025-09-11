'use client';
import { useHasMounted } from '@/utils/customHook';
import { AppBar, Box, Container } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
  const hasMounted = useHasMounted();

  if (!hasMounted) return <></>;

  return (
    <AppBar
      position="fixed"
      sx={{ top: 'auto', bottom: 0, background: '#f2f2f2' }}
    >
      <Container sx={{ display: 'flex', gap: 10 }}>
        <AudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
          volume={0.5}
          style={{
            background: '#f2f2f2',
            boxShadow: 'unset',
          }}
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
  );
};

export default AppFooter;
