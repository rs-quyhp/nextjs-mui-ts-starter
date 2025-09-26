import {
  Box,
  Button,
  Grid,
  LinearProgress,
  LinearProgressProps,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import InputFileUpload from '../upload.button';
import { ITrackUpload } from '../upload.tabs';

interface IProps {
  trackUpload: ITrackUpload;
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const Step2 = (props: IProps) => {
  const { trackUpload } = props;

  const categories = [
    {
      value: 'CHILL',
      label: 'CHILL',
    },
    {
      value: 'WORKOUT',
      label: 'WORKOUT',
    },
    {
      value: 'PARTY',
      label: 'PARTY',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>Your uploading track: {trackUpload.trackName}</Typography>
      <LinearProgressWithLabel value={trackUpload.percent ?? 0} />

      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            padding: '48px',
            gap: '12px',
          }}
        >
          <Box
            sx={{
              height: '250px',
              background: '#f2f2f2',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                maxWidth: '200px',
              }}
            >
              <InputFileUpload onClick={(e) => {}} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ paddingBottom: '24px' }}>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              variant="standard"
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              variant="standard"
            />
            <TextField
              label="Category"
              select
              fullWidth
              margin="dense"
              variant="standard"
              defaultValue={'CHILL'}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button variant="outlined" sx={{ maxWidth: '80px' }}>
            SAVE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;
