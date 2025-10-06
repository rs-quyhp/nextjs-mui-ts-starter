import CommentTrack from '@/components/track/comment.track';
import LikeTrack from '@/components/track/like.track';
import WaveTrack from '@/components/track/wave.track';
import { sendRequest } from '@/utils/api';

interface IProps {
  params: {
    slug: string;
  };
}

const TrackDetailPage = async (props: IProps) => {
  const { slug } = props.params;

  const trackRes = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/${slug}`,
    method: 'GET',
  });

  const commentRes = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/comments`,
    method: 'POST',
    queryParams: {
      trackId: slug,
      sort: '-createdAt',
    },
  });

  if (!trackRes?.data) return <></>;

  return (
    <>
      <WaveTrack track={trackRes.data} comments={commentRes.data?.result} />
      <LikeTrack track={trackRes.data} />
      <CommentTrack track={trackRes.data} comments={commentRes.data?.result} />
    </>
  );
};

export default TrackDetailPage;
