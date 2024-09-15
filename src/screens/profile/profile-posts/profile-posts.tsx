"use client";

import { useCallback } from "react";
import clsx from "clsx";

import classes from "./profile-posts.module.css";
import { ProfilePost } from "./profile-post/profile-post";
import { ProfilePostLoader } from "@/components/loaders/profile-post/profile-post-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";

import { useSWRGetPostsByUserId } from "@/hooks/swr-hooks/post.swr-hooks";

export const ProfilePosts = ({ userId }: { userId: string }) => {
  const {
    data,
    error,
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
  } = useSWRGetPostsByUserId({ userId });

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  const posts = data?.flatMap((each) => each.posts) ?? [];

  if (isLoading) {
    return (
      <div className={clsx(classes.feed)}>
        {[...Array(9)].map((_, index) => (
          <ProfilePostLoader key={index} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={classes.noPosts}>
        <h2>No posts yet! 🧐 </h2>
        <div className={classes.noPostsSub}>
          Guess it’s a ghost town in here… 👻
        </div>
      </div>
    );
  }

  if (error && !data) {
    throw error;
  }

  //todo: Add VirtuosoGrid here
  return (
    <div className={classes.feed}>
      {posts?.map((post, index) => (
        <ProfilePost key={post._id} post={post} userId={userId} index={index} />
      ))}
      <InfiniteLoader context={{ loadMore, isNextPageAvailable }} />
    </div>
  );
};
