'use client';

import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation';

interface IProps {
  params: {
    slug: string;
  };
}

const TrackDetailPage = (props: IProps) => {
  const searchParams = useSearchParams();
  const { slug } = props.params;
  const audio = searchParams.get('audio');

  return <WaveTrack audio={audio} />;
};

export default TrackDetailPage;
