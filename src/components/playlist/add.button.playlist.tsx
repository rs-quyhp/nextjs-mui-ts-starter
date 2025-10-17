'use client';

import { handleAddPlaylistAction } from '@/utils/actions/actions';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddPlayListButton = () => {
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const route = useRouter();
  const toast = useToast();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const res = await handleAddPlaylistAction({
      title: playlistName,
      isPublic,
    });

    if (res.data) {
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
