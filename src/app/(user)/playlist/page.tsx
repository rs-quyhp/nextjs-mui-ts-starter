import { authOptions } from '@/app/api/auth/[...nextauth]/authOption';
import Playlist from '@/components/playlist/playlist';
import { sendRequest } from '@/utils/api';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'Your playlist',
  description: 'List of all playlist you created',
};

const PlaylistPage = async () => {
  const session = await getServerSession(authOptions);

  const playlistRes = await sendRequest<IBackendRes<IModelPaginate<IPlaylist>>>(
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/playlists/by-user`,
      method: 'POST',
      queryParams: {
        current: 1,
        pageSize: 100,
        sort: '-createdAt',
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      nextOption: {
        next: { tag: ['playlist-by-user'] },
      },
    }
  );

  const tracksRes = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks`,
    method: 'GET',
    queryParams: {
      current: 1,
      pageSize: 100,
      sort: '-createdAt',
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const playlists = playlistRes.data?.result || [];
  const tracks = tracksRes.data?.result || [];
  return <Playlist playlists={playlists} tracks={tracks} />;
};

export default PlaylistPage;
