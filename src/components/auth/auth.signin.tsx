'use client';

import {
  ArrowBack,
  GitHub,
  Google,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SignInForm = () => {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    setIsErrorUsername(false);
    setIsErrorPassword(false);
    setErrorUsername('');
    setErrorPassword('');

    if (!username) {
      setIsErrorUsername(true);
      setErrorUsername('Username can not be empty');
    }

    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword('Password can not be empty');
    }

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (!res?.error) {
      setErrMsg('');
      setOpen(false);
      route.push('/');
    } else {
      setErrMsg(res.error);
      setOpen(true);
    }
  };

  return (
    <form>
      <Grid
        container
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          size={{ xs: 12, sm: 8, md: 5, lg: 4 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            padding: '24px',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}
          >
            <Link href="/">
              <ArrowBack />
            </Link>
          </Box>

          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar>
              <Lock />
            </Avatar>
            <Typography component="h1">Sign in</Typography>
          </Grid>

          <FormControl sx={{ width: '100%' }} variant="outlined">
            <TextField
              required
              id="outlined-adornment-username"
              type="text"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              error={isErrorUsername}
              helperText={errorUsername}
              variant="outlined"
              autoFocus
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }} variant="outlined">
            <TextField
              required
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
              error={isErrorPassword}
              helperText={errorPassword}
              onKeyDown={(e) => {
                if (e.key == 'Enter') onSubmit();
              }}
            />
          </FormControl>

          <Button variant="contained" sx={{ width: '100%' }} onClick={onSubmit}>
            SIGN IN
          </Button>

          <Divider sx={{ width: '100%' }}>Or using</Divider>

          <Grid
            sx={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <Avatar
              sx={{ cursor: 'pointer', bgcolor: 'orange' }}
              onClick={() => signIn('github')}
            >
              <GitHub />
            </Avatar>
            <Avatar
              sx={{ cursor: 'pointer', background: 'orange' }}
              onClick={() => signIn('google')}
            >
              <Google />
            </Avatar>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errMsg}
        </Alert>
      </Snackbar>
    </form>
  );
};
