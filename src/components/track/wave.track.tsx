'use client';

import { useWaveSurfer } from '@/utils/customHook';
import { Button, Container, duration } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';
import './wave.scss';

interface IProps {
  audio: string | null;
}

const WaveTrack = (props: IProps) => {
  const containerRef = useRef(null);
  const timeRef = useRef(null);
  const durationRef = useRef(null);
  const hoverRef = useRef(null);
  const { audio } = props;

  const optionMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
    let gradient, progressGradient;

    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // Define the waveform gradient
      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, '#656666'); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666'); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        '#ffffff'
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        '#ffffff'
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        '#B1B1B1'
      ); // Bottom color
      gradient.addColorStop(1, '#B1B1B1'); // Bottom color

      // Define the progress gradient
      progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35
      );
      progressGradient.addColorStop(0, '#EE772F'); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        '#EB4926'
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        '#ffffff'
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        '#ffffff'
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        '#F6B094'
      ); // Bottom color
      progressGradient.addColorStop(1, '#F6B094'); // Bottom color
    }

    return {
      url: `/api?audio=${audio}`,
      barWidth: 3,
      height: 100,
      waveColor: gradient,
      progressColor: progressGradient,
    };
  }, []);

  const { wavesurfer, isPlaying } = useWaveSurfer(
    containerRef,
    optionMemo,
    timeRef,
    durationRef,
    hoverRef
  );

  const onPlayclick = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  return (
    <Container>
      <div ref={containerRef} className="wave-form-container">
        <h2>Wave track</h2>
        <div ref={timeRef} className="wave-form-time">
          0:00
        </div>
        <div ref={durationRef} className="wave-form-duration">
          0:00
        </div>

        <div ref={hoverRef} className="wave-form-hover"></div>

        <div
          className="overlay"
          style={{
            position: 'absolute',
            height: '30px',
            width: '100%',
            bottom: '0',
            background: '#ccc',
            backdropFilter: 'brightness(0.5)',
          }}
        ></div>
      </div>
      <Button onClick={onPlayclick}>{isPlaying ? 'Pause' : 'Play'}</Button>
    </Container>
  );
};

export default WaveTrack;
