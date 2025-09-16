import { useState, useEffect } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export const useWaveSurfer = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: Omit<WaveSurferOptions, 'container'>
) => {
  const [wavesurfer, setWavesuffer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current!,
      ...options,
    });

    setWavesuffer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  useEffect(() => {
    if (!wavesurfer) return;

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
    ];

    return () => subscriptions.forEach((unsub) => unsub());
  }, [wavesurfer]);

  return { wavesurfer, isPlaying };
};
