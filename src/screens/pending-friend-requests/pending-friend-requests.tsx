"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import classes from "./pending-friend-requests.module.css";

import { PendingFriendRequest } from "./pending-friend-request/pending-friend-request";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";
import { PendingFriendRequestLoader } from "@/components/loaders/pending-friend-request/pending-friend-request-loader";
import { useSWRGetPendingFriendRequests } from "@/hooks/swr-hooks/friendship.swr-hooks";

export const PendingFriendRequests = () => {
  const {
    data,
    error,
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
  } = useSWRGetPendingFriendRequests();

  const pendingFriendRequests = data?.flatMap((each) => each.requests) ?? [];

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  if (isLoading) {
    return (
      <div className={classes.pendingFriendRequests}>
        {[...Array(10)].map((_, index) => (
          <PendingFriendRequestLoader key={index} />
        ))}
      </div>
    );
  }

  if (pendingFriendRequests.length === 0) {
    return (
      <div className={classes.pendingFriendRequests}>
        <div className={classes.noPendingFriendRequests}>
          <h2>No pending requests.</h2>
          {!error && (
            <div className={classes.noPendingFriendRequestsSub}>
              {`You keep things clean, Don't you?`}
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
    <div className={classes.pendingFriendRequests}>
      <Virtuoso
        className={classes.virtualPendingFriendRequestsList}
        style={{ height: "90vh" }}
        context={{ isNextPageAvailable, loadMore }}
        itemContent={(_, pendingFriendRequest) => (
          <PendingFriendRequest
            key={pendingFriendRequest._id}
            pendingFriendRequest={pendingFriendRequest}
          />
        )}
        data={pendingFriendRequests}
        components={{
          Footer: InfiniteLoader,
        }}
      />
    </div>
  );
};
