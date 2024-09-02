"use client";

import { useCallback } from "react";
import classes from "./comments.module.css";

import { useSWRGetCommentsByPostId } from "@/hooks/swr-hooks/comment.swr-hooks";

import { Comment } from "./comment/comment";
import { CommentLoader } from "@/components/loaders/comments/comment-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";
import { AddComment } from "./comment/add-comment/add-comment";

export const Comments = ({ postId }: { postId: string }) => {
  const { data, setSize, isLoading, isNextPageAvailable, isNextPageLoading } =
    useSWRGetCommentsByPostId({
      postId,
    });

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  if (isLoading) {
    return (
      <div className={classes.comments}>
        {[...Array(5)].map((_, index) => (
          <CommentLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={classes.comments}>
      {data?.map((pages) =>
        pages.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      )}

      <InfiniteLoader
        loadMore={loadMore}
        isNextPageAvailable={isNextPageAvailable}
      />

      <AddComment postId={postId} />
    </div>
  );
};
