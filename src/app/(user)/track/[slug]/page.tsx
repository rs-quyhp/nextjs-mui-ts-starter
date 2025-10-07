import CommentTrack from '@/components/track/comment.track';
import LikeTrack from '@/components/track/like.track';
import WaveTrack from '@/components/track/wave.track';
import { sendRequest } from '@/utils/api';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface IProps {
  params: {
    slug: string;
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  const strs = slug.split('-');
  const trackId = strs[strs.length - 1].split('.')[0];
  console.log('Check trackId: ', trackId);
  // fetch post information
  const track = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/${trackId}`,
    method: 'GET',
  });

  return {
    title: track.data?.title,
    description: track.data?.description,
    openGraph: {
      type: 'website',
      title: track.data?.title,
      description: track.data?.description,
      images: [
        'https://techcrunch.com/wp-content/uploads/2016/01/soundcloud-reverse.png',
      ],
    },
  };
}

const TrackDetailPage = async (props: IProps) => {
  const { slug } = props.params;

  const strs = slug.split('-');
  const trackId = strs[strs.length - 1].split('.')[0];

  const trackRes = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/${trackId}`,
    method: 'GET',
  });

  const commentRes = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/comments`,
    method: 'POST',
    queryParams: {
      trackId: trackId,
      sort: '-createdAt',
    },
  });

  if (!trackRes?.data) notFound();

  return (
    <>
      <WaveTrack track={trackRes.data} comments={commentRes.data?.result} />
      <LikeTrack track={trackRes.data} />
      <CommentTrack track={trackRes.data} comments={commentRes.data?.result} />
    </>
  );
};

export default TrackDetailPage;
