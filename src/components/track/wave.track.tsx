'use client';

import { useWaveSurfer } from '@/utils/customHook';
import { useMemo, useRef } from 'react';

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

  const wavesuffer = useWaveSurfer(containerRef, optionMemo);

  return (
    <div ref={containerRef}>
      <h2>Wave track</h2>
    </div>
  );
};

export default WaveTrack;
