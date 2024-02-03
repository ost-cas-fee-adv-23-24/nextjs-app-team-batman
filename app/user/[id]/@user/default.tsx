export default function Page({ params }: { params: { id: string } }) {
  return <div className="overflow-auto">USER PROFILE - {params.id}</div>;
}
