import CommentTrack from '@/components/track/comment.track';
import LikeTrack from '@/components/track/like.track';
import WaveTrack from '@/components/track/wave.track';
import { convertSlugUrl, sendRequest } from '@/utils/api';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface IProps {
  params: Promise<{ slug: string }>;
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

export async function generateStaticParams() {
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 10,
    },
  });

  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'WORKOUT',
      limit: 10,
    },
  });

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: {
      category: 'PARTY',
      limit: 10,
    },
  });

  const slugs: { slug: string }[] = [];

  chills.data?.map((track) => {
    slugs.push({
      slug: `${convertSlugUrl(track.title)}-${track._id}.html`,
    });
  });

  workout.data?.map((track) => {
    slugs.push({
      slug: `${convertSlugUrl(track.title)}-${track._id}.html`,
    });
  });

  party.data?.map((track) => {
    slugs.push({
      slug: `${convertSlugUrl(track.title)}-${track._id}.html`,
    });
  });

  return slugs;
}

const TrackDetailPage = async (props: IProps) => {
  const { slug } = await props.params;

  const strs = slug.split('-');
  const trackId = strs[strs.length - 1].split('.')[0];

  const trackRes = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/${trackId}`,
    method: 'GET',
    nextOption: {
      // cache: 'no-store',
      next: { tags: ['track-by-id'] },
    },
  });

  const commentRes = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/comments`,
    method: 'POST',
    queryParams: {
      trackId: trackId,
      sort: '-createdAt',
    },
    nextOption: {
      // cache: 'no-store',
      next: { tags: ['track-comments'] },
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
