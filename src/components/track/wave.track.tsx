'use client';

import { useWaveSurfer } from '@/utils/customHook';
import { Button } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';

interface IProps {
  audio: string | null;
}

const WaveTrack = (props: IProps) => {
  const containerRef = useRef(null);
  const { audio } = props;

  const optionMemo = useMemo(() => {
    return {
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: `/api?audio=${audio}`,
    };
  }, []);

  const { wavesurfer, isPlaying } = useWaveSurfer(containerRef, optionMemo);

  const onPlayclick = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  return (
    <>
      <div ref={containerRef}>
        <h2>Wave track</h2>
      </div>
      <Button onClick={onPlayclick}>{isPlaying ? 'Pause' : 'Play'}</Button>
    </>
  );
};

export default WaveTrack;
