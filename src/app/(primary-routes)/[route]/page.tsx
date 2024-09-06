export default function Page({ params }: { params: { route: string } }) {
  return <div> {params.route}</div>;
}
