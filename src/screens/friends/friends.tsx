"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import classes from "./friends.module.css";

import { useSWRGetFriendsList } from "@/hooks/swr-hooks/friendship.swr-hooks";

import { Friend } from "./friend/friend";
import { FriendLoader } from "@/components/loaders/friends/friend-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";

export const Friends = () => {
  const {
    data,
    error,
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
  } = useSWRGetFriendsList();

  const friends = data?.flatMap((each) => each.friends) ?? [];

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  if (isLoading) {
    return (
      <div className={classes.friends}>
        {[...Array(10)].map((_, index) => (
          <FriendLoader key={index} />
        ))}
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className={classes.friends}>
        <div className={classes.noFriends}>
          <h2>No friends yet.</h2>
          {!error && (
            <div className={classes.noFriendsSub}>
              Start making some friends!
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error && !data) {
    throw error;
  }

  return (
    <div className={classes.friends}>
      <Virtuoso
        className={classes.virtualFriendsList}
        style={{ height: "90vh" }}
        context={{ isNextPageAvailable, loadMore }}
        itemContent={(_, friend) => <Friend key={friend._id} friend={friend} />}
        data={friends}
        components={{
          Footer: InfiniteLoader,
        }}
      />
    </div>
  );
};
