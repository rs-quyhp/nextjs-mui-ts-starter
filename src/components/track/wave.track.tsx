'use client';

import { useTrackContext } from '@/app/lib/track.wrapper';
import { fetchDefaultImages } from '@/utils/api';
import { useWaveSurfer } from '@/utils/customHook';
import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, Container, IconButton, Tooltip } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';
import './wave.scss';

interface IProps {
  track: ITrackTop | null;
  comments: IComment[] | undefined;
}

const WaveTrack = (props: IProps) => {
  const containerRef = useRef(null);
  const timeRef = useRef(null);
  const durationRef = useRef(null);
  const hoverRef = useRef(null);
  const { track, comments } = props;
  const { _id: id, trackUrl: audio } = track || {};

  const { currentTrack, setCurrentTrack } = useTrackContext() ?? {};

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
    if (setCurrentTrack) setCurrentTrack({ ...track, isPlaying: !isPlaying });
  }, [track, isPlaying]);

  useEffect(() => {
    if (currentTrack?.isPlaying !== isPlaying) {
      wavesurfer?.playPause();
    }
  }, [currentTrack, isPlaying]);

  const calLeft = (moment: number) => {
    const duration = 199;
    const percent = (moment / duration) * 100;
    return `${percent}%`;
  };

  return (
    <Container
      sx={{
        background:
          'linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)',
        display: 'flex',
        height: '400px',
        padding: '24px',
        marginTop: '24px',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-start',
            }}
          >
            <IconButton
              sx={{
                background: '#ff6000',
                width: '50px',
                height: '50px',
                color: 'white',
                ':hover': {
                  background: 'rgba(255, 98, 0, 0.94)',
                },
              }}
              onClick={onPlayclick}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <h2
                style={{
                  margin: 'unset',
                  padding: '4px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  width: 'fit-content',
                }}
              >
                {track?.title}
              </h2>
              <h3
                style={{
                  margin: 'unset',
                  padding: '4px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  width: 'fit-content',
                }}
              >
                {track?.description}
              </h3>
            </div>
          </div>
        </div>
        <div ref={containerRef} className="wave-form-container">
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
              backdropFilter: 'brightness(0.5)',
            }}
          ></div>
          <div className="comments" style={{ position: 'relative' }}>
            {comments?.map((cmt) => (
              <Tooltip title={cmt.content} key={cmt._id} arrow>
                <img
                  key={cmt._id}
                  src={fetchDefaultImages(cmt.user?.type)}
                  style={{
                    width: '20px',
                    height: '20px',
                    position: 'absolute',
                    zIndex: '3',
                    top: '71px',
                    left: calLeft(cmt.moment),
                  }}
                  onPointerMove={(e) => {
                    const hover = hoverRef.current as HTMLDivElement | null;
                    if (hover) {
                      hover.style.width = calLeft(cmt.moment + 3);
                    }
                  }}
                />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <Box
        sx={{
          width: '250px',
          height: '250px',
          background: '#cccccc',
          flexShrink: '0',
          margin: '24px',
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/images/${track?.imgUrl}`}
          style={{
            width: 250,
            height: 250,
            objectFit: 'cover',
          }}
        ></img>
      </Box>
    </Container>
  );
};

export default WaveTrack;
