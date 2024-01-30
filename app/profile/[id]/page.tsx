export default function Profile({ params }: { params: { id: string } }) {
  return <div>Profile from: {params.id}</div>;
}
