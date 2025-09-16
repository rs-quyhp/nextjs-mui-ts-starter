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
  const [wavesurfer, setWavesuffer] = useState<any>(null);

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

  return wavesurfer;
};
