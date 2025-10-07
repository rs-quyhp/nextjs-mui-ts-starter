'use client';

import { useTrackContext } from '@/app/lib/track.wrapper';
import { fetchDefaultImages, sendRequest } from '@/utils/api';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
dayjs.extend(relativeTime);

interface IProps {
  track: ITrackTop | undefined;
  comments: IComment[] | undefined;
}

const CommentTrack = (props: IProps) => {
  const { track, comments } = props;
  const [myComment, setMyComment] = useState('');
  const session = useSession();
  const route = useRouter();
  const { wavesurfer, setCurrentTrack } = useTrackContext() ?? {};

  const onSubmitComment = async () => {
    const res = await sendRequest<IBackendRes<IComment>>({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments`,
      method: 'POST',
      body: {
        content: myComment,
        moment: Math.round((wavesurfer as WaveSurfer).getCurrentTime() ?? 0),
        track: track?._id,
      },
      headers: {
        Authorization: `Bearer ${session.data?.access_token}`,
      },
    });

    if (res.data) {
      setMyComment('');
      route.refresh();
    }
  };

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  const onJumpTrack = (momment: number) => {
    if (wavesurfer && setCurrentTrack) {
      const ws = wavesurfer as WaveSurfer;
      const duration = ws.getDuration();
      ws.seekTo(momment / duration);
      setCurrentTrack((prevTrack: ITrackTop) => ({
        ...prevTrack,
        isPlaying: true,
      }));
    }
  };

  return (
    <Container
      sx={{
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        gap: '24px',
      }}
      disableGutters
    >
      <TextField
        variant="standard"
        fullWidth
        label="Comment"
        value={myComment}
        onChange={(e) => setMyComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmitComment();
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: '48px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            alt={track?.uploader.name ?? 'uploader'}
            src={fetchDefaultImages(track?.uploader?.type ?? '')}
            width={200}
            height={200}
            style={{
              objectFit: 'cover',
            }}
          />
          <Typography>{track?.uploader?.email}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '36px',
          }}
        >
          {comments?.map((comment) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Avatar>
                  <Image
                    alt={comment?.user?.name ?? 'commenter'}
                    src={fetchDefaultImages(comment?.user?.type)}
                    width={40}
                    height={40}
                  />
                </Avatar>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: '4px',
                  }}
                >
                  <Typography variant="caption">
                    {comment?.user?.email ?? 'Anymous'} at{' '}
                    <span
                      onClick={() => onJumpTrack(comment.moment)}
                      style={{ cursor: 'pointer' }}
                    >
                      {comment?.moment ? formatTime(comment.moment) : '0:00'}
                    </span>
                  </Typography>
                  <Typography variant="body1">{comment?.content}</Typography>
                </Box>
              </Box>
              <Box> {dayjs(comment?.createdAt).fromNow()}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default CommentTrack;
