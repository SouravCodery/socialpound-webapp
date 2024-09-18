import { Likes } from "@/screens/likes/likes";

export default function LikesPage({ params }: { params: { postId: string } }) {
  const { postId } = params;

  return <Likes postId={postId} />;
}
