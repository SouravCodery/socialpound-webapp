"use client";
import { useCallback } from "react";

import clsx from "clsx";
import classes from "./feed.module.css";
import { Post } from "@/components/post/post";

import { useSWRGetUserFeed } from "@/hooks/swr-hooks/post.swr-hooks";
import { PostLoader } from "../loaders/post/post-loader";
import { InfiniteLoader } from "../loaders/infinite-loader/infinite-loader";

export default function Feed() {
  const { data, setSize, isLoading, isNextPageAvailable, isNextPageLoading } =
    useSWRGetUserFeed();

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  if (isLoading) {
    return (
      <div className={clsx(classes.feed)}>
        {[...Array(2)].map((_, index) => (
          <PostLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={classes.feed}>
      {data?.map((pages) =>
        pages.posts.map((post) => <Post key={post._id} post={post} />)
      )}

      <InfiniteLoader
        loadMore={loadMore}
        isNextPageAvailable={isNextPageAvailable}
      />
    </div>
  );
}
