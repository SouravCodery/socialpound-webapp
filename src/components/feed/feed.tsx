"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";

import clsx from "clsx";
import classes from "./feed.module.css";
import { Post } from "@/components/post/post";

import { useSWRGetUserFeed } from "@/hooks/swr-hooks/post.swr-hooks";
import { PostLoader } from "../loaders/post/post-loader";
import { InfiniteLoader } from "../loaders/infinite-loader/infinite-loader";
import { useLoadPostsLikedByUser } from "@/hooks/like.hooks";

export default function Feed() {
  const { data, setSize, isLoading, isNextPageAvailable, isNextPageLoading } =
    useSWRGetUserFeed();
  const { isPostsLikedByUserLoading } = useLoadPostsLikedByUser();

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  const posts = data?.flatMap((each) => each.posts) ?? [];

  if (isLoading || isPostsLikedByUserLoading) {
    return (
      <div className={clsx(classes.feed)}>
        {[...Array(4)].map((_, index) => (
          <PostLoader key={index} />
        ))}
      </div>
    );
  }

  return (
    <Virtuoso
      className={classes.virtualFeed}
      style={{ height: "80vh" }}
      context={{ isNextPageAvailable, loadMore }}
      itemContent={(index, post) => <Post key={post._id} post={post} />}
      data={posts}
      components={{
        Footer: InfiniteLoader,
      }}
    />
  );
}
