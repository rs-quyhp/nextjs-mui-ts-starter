import { Container } from '@mui/material';

export async function generateStaticParams() {
  return [{ slug: '123' }, { slug: '456' }, { slug: 'test' }];
}

const TestSlug = ({ params }: any) => {
  const { slug } = params;
  return <Container>Test Slug {slug}</Container>;
};

export default TestSlug;
