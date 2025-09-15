'use client';

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

  console.log('Check slug: ', slug);
  console.log('Check audio: ', audio);

  return (
    <div>
      <h2>{audio}</h2>
    </div>
  );
};

export default TrackDetailPage;
