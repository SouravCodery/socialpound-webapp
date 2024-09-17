"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import clsx from "clsx";

import classes from "./posts.module.css";

import { useLoadPostsLikedByUser } from "@/hooks/like.hooks";
import { useSWRGetPostsByUserId } from "@/hooks/swr-hooks/post.swr-hooks";
import { PostLoader } from "../loaders/post/post-loader";
import { Post } from "@/components/post/post";
import { NoPosts } from "../no-posts/no-posts";
import { InfiniteLoader } from "../loaders/infinite-loader/infinite-loader";

export default function Posts({ userId }: { userId: string }) {
  const {
    data,
    error,
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
  } = useSWRGetPostsByUserId({ userId });
  const { isPostsLikedByUserLoading } = useLoadPostsLikedByUser();

  const posts = data?.flatMap((each) => each.posts) ?? [];

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  const params = useSearchParams();
  const index = parseInt(params.get("index") ?? "0");

  const virtuosoRef = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    if (virtuosoRef?.current) {
      virtuosoRef.current.scrollToIndex({
        index,
        align: "center",
        behavior: "smooth",
      });
    }
  }, [virtuosoRef?.current]);

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
      ref={virtuosoRef}
      className={classes.virtualFeed}
      style={{ height: "100vh" }}
      context={{ isNextPageAvailable, loadMore }}
      itemContent={(index, post) => (
        <Post key={post._id} post={post} isOwnPost={userId === post.user._id} />
      )}
      data={posts}
      components={{
        Footer: InfiniteLoader,
      }}
    />
  );
}
