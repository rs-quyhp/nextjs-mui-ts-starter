import WaveTrack from '@/components/track/wave.track';
import { sendRequest } from '@/utils/api';

interface IProps {
  params: {
    slug: string;
  };
}

const TrackDetailPage = async (props: IProps) => {
  const { slug } = props.params;

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tracks/${slug}`,
    method: 'GET',
  });

  if (!res?.data) return <></>;

  return <WaveTrack track={res.data} />;
};

export default TrackDetailPage;
