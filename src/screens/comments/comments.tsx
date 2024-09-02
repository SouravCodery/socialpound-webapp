"use client";

import classes from "./comments.module.css";
import { useSWRGetCommentsByPostId } from "@/hooks/swr-hooks/comment.swr-hooks";
import { Comment } from "./comment/comment";

export const Comments = ({ postId }: { postId: string }) => {
  const { data, error, size, setSize, isLoading, isNextPageAvailable } =
    useSWRGetCommentsByPostId({
      postId,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.comments}>
      {data?.map((pages, index) =>
        pages.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      )}

      {isNextPageAvailable && (
        <button onClick={() => setSize(size + 1)}>Load More</button>
      )}
    </div>
  );
};
