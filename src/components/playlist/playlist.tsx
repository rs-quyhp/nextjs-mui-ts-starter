'use client';

import { useTrackContext } from '@/app/lib/track.wrapper';
import { convertSlugUrl } from '@/utils/api';
import { ExpandMore, Pause, PlayArrow } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import AddPlayListButton from './add.button.playlist';
import AddPlayListTrackButton from './add.button.track.playlist';

interface IProps {
  playlists: IPlaylist[];
  tracks: ITrackTop[];
}

const Playlist = (props: IProps) => {
  const [currentPlaylist, setCurrentPlaylist] = useState<number | null>(null);
  const { playlists } = props;

  const { currentTrack, setCurrentTrack } = useTrackContext() ?? {};

  const onClickPlay = (track: ITrackTop) => {
    if (setCurrentTrack)
      setCurrentTrack((prevTrack: IShareTrack) => ({
        ...track,
        isPlaying:
          prevTrack?.trackUrl === track.trackUrl ? !prevTrack.isPlaying : true,
      }));
  };

  return (
    <Container>
      <Box
        sx={{
          background: '#f1f5fb',
          margin: '36px',
          padding: '36px',
          borderRadius: '6px',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Playlists</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '24px',
            }}
          >
            <AddPlayListButton />
            <AddPlayListTrackButton {...props} />
          </Box>
        </Box>

        <Divider
          sx={{
            marginTop: '24px',
            marginBottom: '24px',
          }}
        />

        {/* Playlist list */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {playlists.map((playlist, index) => (
            <Accordion
              key={playlist._id}
              expanded={index === currentPlaylist}
              onChange={() =>
                setCurrentPlaylist(index === currentPlaylist ? null : index)
              }
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{playlist.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {playlist.tracks?.map((track) => (
                  <Box key={track._id}>
                    <Box
                      sx={{
                        display: 'flex',
                        padding: '12px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Link
                        href={`/track/${convertSlugUrl(track.title)}-${
                          track._id
                        }.html?audio=${track.trackUrl}`}
                        style={{
                          textDecoration: 'unset',
                          color: '#000000',
                        }}
                      >
                        {track.title}
                      </Link>
                      <div onClick={() => onClickPlay(track)}>
                        {currentTrack?.isPlaying &&
                        currentTrack._id === track._id ? (
                          <Pause color="action" sx={{ cursor: 'pointer' }} />
                        ) : (
                          <PlayArrow
                            color="action"
                            sx={{ cursor: 'pointer' }}
                          />
                        )}
                      </div>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Playlist;
