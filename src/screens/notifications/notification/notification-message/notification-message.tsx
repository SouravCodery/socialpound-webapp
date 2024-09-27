import Link from "next/link";
import clsx from "clsx";
import classes from "./notification-message.module.css";

import { DELETED_USER } from "@/constants/deleted-user";
import { NotificationInterface } from "@/models/interfaces/notification.interface";
import { trimUsername } from "@/helpers/misc.helpers";

export const NotificationMessage = ({
  notification,
}: {
  notification: NotificationInterface;
}) => {
  const sender = notification?.sender || DELETED_USER;
  const username = trimUsername(sender.username);

  const senderProfile = sender?._id ? `/profile/${sender?.username}` : `/`;

  switch (notification.type) {
    case "like-on-post":
      return (
        <div className={classes.message}>
          <Link
            href={senderProfile}
            prefetch={false}
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </Link>{" "}
          liked your post
        </div>
      );
    case "like-on-comment":
      return (
        <div className={classes.message}>
          <Link
            href={senderProfile}
            prefetch={false}
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </Link>{" "}
          liked your comment
        </div>
      );
    case "comment":
      return (
        <div className={classes.message}>
          <Link
            href={senderProfile}
            prefetch={false}
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </Link>{" "}
          commented on your post: <br />
          {notification.comment?.text}
        </div>
      );
    case "reply":
      return (
        <div className={classes.message}>
          <Link
            href={senderProfile}
            prefetch={false}
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </Link>{" "}
          replied to your comment
        </div>
      );
    case "add-friend":
      return (
        <div className={classes.message}>
          <Link
            href={senderProfile}
            prefetch={false}
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </Link>{" "}
          added you as a friend
        </div>
      );
    default:
      return <div className={classes.message}> </div>;
  }
};
