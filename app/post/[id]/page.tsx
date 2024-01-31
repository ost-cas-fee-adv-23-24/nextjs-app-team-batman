import { Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { Card } from '@/components/card';

export default function Posts({ params }: { params: { id: string } }) {
  const image = {
    src: 'https://nextui.org/images/fruit-1.jpeg',
    alt: 'test person',
  };
  return (
    <main className="">
      <Card image={image}>
        <Heading level={4}> My Post: </Heading>
        {params.id.toString()}
      </Card>
    </main>
  );
}
