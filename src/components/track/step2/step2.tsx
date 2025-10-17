'use client';

import { handleUploadTrackAction } from '@/utils/actions/actions';
import { useToast } from '@/utils/toast';
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
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UploadButton from '../upload.button';
import { ITrackUpload } from '../upload.tabs';

interface IProps {
  trackUpload: ITrackUpload;
  setTabIndex: (i: number) => void;
}

export interface ITrackInfor {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
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
  const { trackUpload, setTabIndex } = props;
  const { data: session } = useSession();
  const route = useRouter();
  const toast = useToast();
  const [trackInfo, setTrackInfo] = useState<ITrackInfor>({
    title: '',
    description: '',
    trackUrl: '',
    imgUrl: '',
    category: '',
  });

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

  const onSave = async () => {
    const res = await handleUploadTrackAction({ trackInfo });

    if (!res.error) {
      toast.success('New track added');
      setTabIndex(0);
    } else {
      toast.error(res.message);
    }
  };

  const handleUpload = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append('fileUpload', image);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: 'images',
          },
        }
      );

      console.log('Check image upload: ', res);
      if (res?.data?.data?.fileName) {
        setTrackInfo(
          (prevTrackInfo: ITrackInfor) =>
            ({
              ...prevTrackInfo,
              imgUrl: res.data.data.fileName,
            } as ITrackInfor)
        );
      }
    } catch (error) {
      //@ts-ignore
      alert(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (trackUpload && trackUpload.uploadedTrackName) {
      setTrackInfo((prevTrackInfo: ITrackInfor) => ({
        ...prevTrackInfo,
        trackUrl: trackUpload.uploadedTrackName,
      }));
    }
  }, [trackUpload]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>Your uploading track: {trackUpload.trackName}</Typography>
      <LinearProgressWithLabel value={trackUpload.percent ?? 0} />

      <Grid container>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
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
          >
            {trackInfo.imgUrl && (
              <div
                style={{
                  position: 'relative',
                  height: '250px',
                  width: '100%',
                }}
              >
                <Image
                  alt={trackInfo.title ?? 'track thumbnail'}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/images/${trackInfo.imgUrl}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </Box>
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
              <UploadButton
                onChange={(e) => {
                  const event = e.target as HTMLInputElement;
                  if (event.files) {
                    const file = event.files[0];
                    console.log('Check upload button: ', file);
                    handleUpload(file);
                  }
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          size={{
            xs: 1,
            sm: 6,
            md: 8,
          }}
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
              value={trackInfo?.title}
              onChange={(e) =>
                setTrackInfo((prevTrackInfo: ITrackInfor) => ({
                  ...prevTrackInfo,
                  title: e.target.value,
                }))
              }
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              variant="standard"
              value={trackInfo?.description}
              onChange={(e) =>
                setTrackInfo((prevTrackInfo: ITrackInfor) => ({
                  ...prevTrackInfo,
                  description: e.target.value,
                }))
              }
            />
            <TextField
              label="Category"
              select
              fullWidth
              margin="dense"
              variant="standard"
              defaultValue={'CHILL'}
              value={trackInfo?.category}
              onChange={(e) =>
                setTrackInfo((prevTrackInfo: ITrackInfor) => ({
                  ...prevTrackInfo,
                  category: e.target.value,
                }))
              }
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button variant="outlined" sx={{ maxWidth: '80px' }} onClick={onSave}>
            SAVE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;
