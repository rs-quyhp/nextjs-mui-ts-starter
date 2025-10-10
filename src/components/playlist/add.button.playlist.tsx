'use client';

import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';
import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddPlayListButton = () => {
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const { data: session } = useSession();
  const route = useRouter();
  const toast = useToast();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const res = await sendRequest<IBackendRes<IModelPaginate<IPlaylist>>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/playlists/empty`,
      method: 'POST',
      body: {
        title: playlistName,
        isPublic,
      },
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
      setIsPublic(false);
      setPlaylistName('');
      route.refresh();
      toast.success('New playlist added ! ');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Button variant="outlined" startIcon={<Add />} onClick={handleClickOpen}>
        PLAYLIST
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="name"
            label="Playlist Name"
            fullWidth
            variant="standard"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />

          <FormControlLabel
            control={
              <Switch
                defaultChecked
                checked={isPublic}
                name="public"
                onChange={() => setIsPublic(!isPublic)}
              />
            }
            label={isPublic ? 'Public' : 'Private'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPlayListButton;
