"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import clsx from "clsx";

import classes from "./posts.module.css";

import { useLoadPostsLikedByUser } from "@/hooks/like.hooks";
import { useSWRGetPostsByUserId } from "@/hooks/swr-hooks/post.swr-hooks";
import { useGetAuthenticatedUserFromLocalStorage } from "@/hooks/user.hooks";
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
    updatePosts,
  } = useSWRGetPostsByUserId({ userId });
  const { isPostsLikedByUserLoading } = useLoadPostsLikedByUser();

  const authenticatedUser = useGetAuthenticatedUserFromLocalStorage();

  const updatePostsAfterDeletion = ({ postId }: { postId: string }) => {
    updatePosts(
      (data) => {
        return data?.map((each) => {
          return {
            ...each,
            posts: each.posts.filter((post) => post._id !== postId),
          };
        });
      },
      {
        revalidate: false,
      }
    );
  };

  const posts = data?.flatMap((each) => each.posts) ?? [];

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

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
      style={{ height: "100vh" }}
      context={{ isNextPageAvailable, loadMore }}
      itemContent={(_, post) => (
        <Post
          key={post._id}
          post={post}
          isOwnPost={authenticatedUser._id === post?.user?._id}
          updatePostsAfterDeletion={updatePostsAfterDeletion}
        />
      )}
      data={posts}
      components={{
        Footer: InfiniteLoader,
      }}
    />
  );
}
