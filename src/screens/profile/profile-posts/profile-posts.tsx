"use client";

import { useCallback } from "react";
import clsx from "clsx";

import classes from "./profile-posts.module.css";
import { ProfilePost } from "./profile-post/profile-post";
import { ProfilePostLoader } from "@/components/loaders/profile-post/profile-post-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";

import { useSWRGetPostsByUserId } from "@/hooks/swr-hooks/post.swr-hooks";

export const ProfilePosts = ({ userId }: { userId: string }) => {
  const { data, setSize, isLoading, isNextPageAvailable, isNextPageLoading } =
    useSWRGetPostsByUserId({ userId });

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
