'use client';

import React, { createContext, useContext, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initCurrentTrack = null;
  const [currentTrack, setCurrentTrack] = useState<IShareTrack | null>(
    initCurrentTrack
  );
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>();

  return (
    <TrackContext.Provider
      value={{ currentTrack, setCurrentTrack, wavesurfer, setWavesurfer }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
