'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOption';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { sendRequest } from '../api';

export const handleLikeTrackAction = async (data: any) => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: {
      track: data.trackId,
      quantity: data.quantity,
    },
  });

  revalidateTag('track-by-id');
  revalidateTag('favorite-by-user');

  return res;
};

export const handleAddPlaylistAction = async (data: any) => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IModelPaginate<IPlaylist>>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/playlists/empty`,
    method: 'POST',
    body: {
      title: data.title,
      isPublic: data.isPublic,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  revalidateTag('playlist-by-user');

  return res;
};

export const handleAddPlaylistTrackAction = async (data: any) => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IPlaylist>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/playlists`,
    method: 'PATCH',
    body: data.body,
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  revalidateTag('playlist-by-user');

  return res;
};

export const handleAddTrackCommentAction = async (data: any) => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<IComment>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments`,
    method: 'POST',
    body: {
      content: data.content,
      moment: data.moment,
      track: data.trackId,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  revalidateTag('track-comments');
  return res;
};

export const handleUploadTrackAction = async (data: any) => {
  const session = await getServerSession(authOptions);

  const res = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: data.trackInfo,
  });

  revalidateTag('track-by-user');
  return res;
};
