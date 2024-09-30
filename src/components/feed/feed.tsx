"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import clsx from "clsx";

import classes from "./feed.module.css";

import { useLoadPostsLikedByUser } from "@/hooks/like.hooks";
import { useSWRGetUserFeed } from "@/hooks/swr-hooks/post.swr-hooks";

import { PostLoader } from "../loaders/post/post-loader";
import { Post } from "@/components/post/post";
import { NoPosts } from "../no-posts/no-posts";
import { InfiniteLoader } from "../loaders/infinite-loader/infinite-loader";

export default function Feed() {
  const {
    data,
    error,
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
  } = useSWRGetUserFeed();
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

  if (posts.length === 0) {
    return <NoPosts />;
  }

  if (error && !data) {
    throw error;
  }

  return (
    <Virtuoso
      className={classes.virtualFeed}
      style={{ height: "90vh" }}
      context={{ isNextPageAvailable, loadMore }}
      itemContent={(_, post) => <Post key={post._id} post={post} />}
      data={posts}
      components={{
        Footer: InfiniteLoader,
      }}
    />
  );
}
