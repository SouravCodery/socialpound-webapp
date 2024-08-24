"use client";

import classes from "./comments.module.css";
import { useSWRGetCommentsByPostId } from "@/hooks/swr-hooks/comment.swr-hooks";
import { Comment } from "./comment/comment";

export const Comments = ({ postId }: { postId: string }) => {
  const { comments, cursor, error, isLoading } = useSWRGetCommentsByPostId({
    postId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.comments}>
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};
