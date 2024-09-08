import Posts from "@/components/posts/posts";

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  return <Posts userId={userId} />;
}
