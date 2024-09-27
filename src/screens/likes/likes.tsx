"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import classes from "./likes.module.css";

import { useSWRGetLikesByPostId } from "@/hooks/swr-hooks/like.swr-hooks";

import { Like } from "./like/like";
import { LikeLoader } from "@/components/loaders/likes/like-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";

export const Likes = ({ postId }: { postId: string }) => {
  const {
    data,
    error,
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
  } = useSWRGetLikesByPostId({
    postId,
  });

  const likes = data?.flatMap((each) => each.likes) ?? [];

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  if (isLoading) {
    return (
      <div className={classes.likes}>
        {[...Array(10)].map((_, index) => (
          <LikeLoader key={index} />
        ))}
      </div>
    );
  }

  if (likes.length === 0) {
    return (
      <div className={classes.likes}>
        <div className={classes.noLikes}>
          <h2>No likes yet.</h2>
          {!error && (
            <div className={classes.noLikesSub}>
              Be the first one to like it.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error && !data) {
    throw error;
  }

  return (
    <div className={classes.likes}>
      <Virtuoso
        className={classes.virtualLikesList}
        style={{ height: "90vh" }}
        context={{ isNextPageAvailable, loadMore }}
        itemContent={(_, like) => <Like key={like._id} like={like} />}
        data={likes}
        components={{
          Footer: InfiniteLoader,
        }}
      />
    </div>
  );
};
