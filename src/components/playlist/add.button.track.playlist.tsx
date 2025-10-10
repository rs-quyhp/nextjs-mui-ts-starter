'use client';

import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IProps {
  playlists: IPlaylist[];
  tracks: ITrackTop[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddPlayListTrackButton = (props: IProps) => {
  const { tracks, playlists } = props;
  const [open, setOpen] = useState(false);
  const [currentPlaylistId, setCurrentPlaylistId] = useState('');
  const [currentTrackIds, setCurrentTrackIds] = useState<string[]>([]);
  const { data: session } = useSession();
  const route = useRouter();
  const toast = useToast();
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const currentPlaylist = playlists.find(
      (playlist) => playlist._id === currentPlaylistId
    );

    const body = {
      id: currentPlaylist?._id,
      title: currentPlaylist?.title,
      isPublic: currentPlaylist?.isPublic,
      tracks: currentTrackIds,
    };

    const res = await sendRequest<IBackendRes<IPlaylist>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/playlists`,
      method: 'PATCH',
      body,
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (res.data) {
      await sendRequest<IBackendRes<any>>({
        url: '/api/revalidate',
        method: 'POST',
        queryParams: {
          tag: 'playlist-by-user',
          secret: 'justarandomstring',
        },
      });

      handleClose();
      setCurrentPlaylistId('');
      setCurrentTrackIds([]);
      route.refresh();
      toast.success('Tracks added to playlist ! ');
    } else {
      toast.error(res.message);
    }
  };

  function getStyles(trackId: string, theme: Theme) {
    return {
      fontWeight: tracks.find((track) => track._id === trackId)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  return (
    <>
      <Button variant="outlined" startIcon={<Add />} onClick={handleClickOpen}>
        TRACK
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add track to playlist</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <FormControl variant="standard" fullWidth>
              <InputLabel id="playlist-input-label">Playlist</InputLabel>
              <Select
                labelId="playlist-input-label"
                value={currentPlaylistId}
                onChange={(e) => {
                  setCurrentPlaylistId(e.target.value);
                  setCurrentTrackIds(
                    playlists
                      .find((playlist) => playlist._id === e.target.value)
                      ?.tracks?.map((track) => track._id) ?? []
                  );
                }}
                name="playlist"
                fullWidth
              >
                {playlists.map((playlist) => (
                  <MenuItem value={playlist._id} key={playlist._id}>
                    {playlist.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="track-input-label">Tracks</InputLabel>
              <Select
                labelId="track-input-label"
                multiple
                value={currentTrackIds}
                onChange={(e) =>
                  setCurrentTrackIds(
                    typeof e.target.value === 'string'
                      ? e.target.value.split(',')
                      : e.target.value
                  )
                }
                input={
                  <OutlinedInput id="select-multiple-chip" label="Tracks" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          tracks.find((track) => track._id === value)?.title
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tracks.map((track) => (
                  <MenuItem
                    key={track._id}
                    value={track._id}
                    style={getStyles(track._id, theme)}
                  >
                    {track.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPlayListTrackButton;
