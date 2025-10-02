'use client';

import React, { createContext, useContext, useState } from 'react';

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

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
