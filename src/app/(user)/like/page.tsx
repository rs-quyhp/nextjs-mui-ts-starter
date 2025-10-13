import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FavoriteTracks from '@/components/like/favorite.tracks.list';
import { sendRequest } from '@/utils/api';
import { getServerSession } from 'next-auth';

const LikePage = async () => {
  const session = await getServerSession(authOptions);

  const favoriteTracks = await sendRequest<
    IBackendRes<IModelPaginate<ITrackTop>>
  >({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/likes`,
    method: 'GET',
    queryParams: {
      current: 1,
      pageSize: 100,
      sort: '-createdAt',
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tag: ['favorite-by-user'] },
    },
  });

  if (!favoriteTracks.data?.result) return <></>;

  return <FavoriteTracks favoriteTracks={favoriteTracks.data.result} />;
};

export default LikePage;
