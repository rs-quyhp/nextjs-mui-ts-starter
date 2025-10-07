'use client';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          textAlign: 'center',
          animation: 'fadeIn 400ms ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(8px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We couldn’t find the track you’re looking for. It may have been
            moved or deleted.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => window.history.back()}
          >
            Go back
          </Button>
          <Button
            component={Link}
            href="/"
            variant="outlined"
            startIcon={<HomeRoundedIcon />}
          >
            Go home
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
