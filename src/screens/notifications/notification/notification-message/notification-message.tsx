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

  switch (notification.type) {
    case "like-on-post":
      return (
        <div className={classes.message}>
          <span
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </span>{" "}
          liked your post
        </div>
      );
    case "like-on-comment":
      return (
        <div className={classes.message}>
          <span
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </span>{" "}
          liked your comment
        </div>
      );
    case "comment":
      return (
        <div className={classes.message}>
          <span
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </span>{" "}
          commented on your post: <br />
          {notification.comment?.text}
        </div>
      );
    case "reply":
      return (
        <div className={classes.message}>
          <span
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </span>{" "}
          replied to your comment
        </div>
      );
    case "add-friend":
      return (
        <div className={classes.message}>
          <span
            className={clsx(classes.username, !sender?._id && "deletedUser")}
          >
            {username}
          </span>{" "}
          added you as a friend
        </div>
      );
    default:
      return <div className={classes.message}> </div>;
  }
};
