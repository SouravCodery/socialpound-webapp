"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import clsx from "clsx";

import classes from "./posts.module.css";

import { useSWRGetPostsByUserId } from "@/hooks/swr-hooks/post.swr-hooks";
import { Post } from "@/components/post/post";
import { PostLoader } from "../loaders/post/post-loader";
import { InfiniteLoader } from "../loaders/infinite-loader/infinite-loader";

export default function Posts({ userId }: { userId: string }) {
  const { data, setSize, isLoading, isNextPageAvailable, isNextPageLoading } =
    useSWRGetPostsByUserId({ userId });
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

  if (isLoading) {
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
      ref={virtuosoRef}
      className={classes.virtualFeed}
      style={{ height: "100vh" }}
      context={{ isNextPageAvailable, loadMore }}
      itemContent={(index, post) => <Post key={post._id} post={post} />}
      data={posts}
      components={{
        Footer: InfiniteLoader,
      }}
    />
  );
}