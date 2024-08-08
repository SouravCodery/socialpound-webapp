"use client";

import clsx from "clsx";

import classes from "./feed.module.css";
import { Post } from "@/components/post/post";

import { useSWRFetchPosts } from "@/hooks/swr-hooks/post.swr-hooks";

export default function Feed() {
  const { posts, error, isLoading } = useSWRFetchPosts();

  if (isLoading) {
    return <div>Loading!</div>;
  }

  return (
    <div className={clsx(classes.feed)}>
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
