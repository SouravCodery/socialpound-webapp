"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import classes from "./notifications.module.css";

import { useSWRGetNotificationsByUser } from "@/hooks/swr-hooks/notification.swr-hooks";

import { Notification } from "./notification/notification";
import { NotificationLoader } from "@/components/loaders/notification/notification-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";

export const Notifications = () => {
  const { data, setSize, isLoading, isNextPageAvailable, isNextPageLoading } =
    useSWRGetNotificationsByUser();

  const notifications = data?.flatMap((each) => each.notifications) ?? [];

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  if (isLoading) {
    return (
      <div className={classes.notifications}>
        {[...Array(8)].map((_, index) => (
          <NotificationLoader key={index} />
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className={classes.notifications}>
        <div className={classes.noNotifications}>
          <h2>No notifications yet.</h2>
          <div className={classes.noNotificationsSub}>
            Start engaging around.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.notifications}>
      <Virtuoso
        className={classes.virtualNotificationsList}
        style={{ height: "80vh" }}
        context={{ isNextPageAvailable, loadMore }}
        itemContent={(index, notification) => (
          <Notification key={notification._id} notification={notification} />
        )}
        data={notifications}
        components={{
          Footer: InfiniteLoader,
        }}
      />
    </div>
  );
};
