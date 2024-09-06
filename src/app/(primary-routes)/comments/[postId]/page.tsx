import { Comments } from "@/screens/comments/comments";

export default function CommentsPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;

  return <Comments postId={postId} />;
}
