'use client'; // Error boundaries must be Client Components

import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We hit an unexpected error. You can try again or go back home.
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
            startIcon={<RefreshRoundedIcon />}
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Button
            component={Link}
            href="/"
            variant="outlined"
            startIcon={<HomeRoundedIcon />}
          >
            Go home
          </Button>
          <Button
            variant="text"
            startIcon={<BugReportRoundedIcon />}
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? 'Hide details' : 'View details'}
          </Button>
        </Stack>

        {showDetails && (
          <Box sx={{ mt: 3, textAlign: 'left' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Error details
            </Typography>
            <Box
              component="pre"
              sx={{
                m: 0,
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
              {error?.message || 'No message available.'}
            </Box>
            {error?.digest && (
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ display: 'block', mt: 1 }}
              >
                Digest: {error.digest}
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}
