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
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
    updateLikes,
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

  if (true || isLoading) {
    return (
      <div className={classes.likes}>
        {[...Array(8)].map((_, index) => (
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
        </div>
      </div>
    );
  }

  return (
    <div className={classes.likes}>
      <Virtuoso
        className={classes.virtualLikesList}
        style={{ height: "80vh" }}
        context={{ isNextPageAvailable, loadMore }}
        itemContent={(index, like) => <Like key={like._id} like={like} />}
        data={likes}
        components={{
          Footer: InfiniteLoader,
        }}
      />
    </div>
  );
};
