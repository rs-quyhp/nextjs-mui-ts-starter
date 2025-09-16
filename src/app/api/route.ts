import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const audio = url.searchParams.get('audio');
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks/${audio}`);
};
