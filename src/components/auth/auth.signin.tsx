'use client';

import {
  GitHub,
  Google,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

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

    await signIn('credentials', {
      username,
      password,
    });
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
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            padding: '24px',
          }}
        >
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
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }} variant="outlined">
            <TextField
              required
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              inputProps={{
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
              }}
              onChange={(e) => setPassword(e.target.value)}
              error={isErrorPassword}
              helperText={errorPassword}
            />
          </FormControl>

          <Button variant="contained" sx={{ width: '100%' }} onClick={onSubmit}>
            SIGN IN
          </Button>

          <Divider sx={{ width: '100%' }}>Or using</Divider>

          <Grid
            item
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
            <Avatar sx={{ cursor: 'pointer', background: 'orange' }}>
              <Google />
            </Avatar>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
