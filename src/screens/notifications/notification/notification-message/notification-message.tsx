import classes from "./notification-message.module.css";
import { NotificationInterface } from "@/models/interfaces/notification.interface";

export const NotificationMessage = ({
  notification,
}: {
  notification: NotificationInterface;
}) => {
  const username = notification.sender.username.split("@")[0];

  switch (notification.type) {
    case "like-on-post":
      return (
        <div className={classes.message}>
          <span className={classes.username}>{username}</span> liked your post
        </div>
      );
    case "like-on-comment":
      return (
        <div className={classes.message}>
          <span className={classes.username}>{username}</span> liked your
          comment
        </div>
      );
    case "comment":
      return (
        <div className={classes.message}>
          <span className={classes.username}>{username}</span> commented on your
          post: <br />
          {notification.comment?.text}
        </div>
      );
    case "reply":
      return (
        <div className={classes.message}>
          <span className={classes.username}>{username}</span> replied to your
          comment
        </div>
      );
    case "add-friend":
      return (
        <div className={classes.message}>
          <span className={classes.username}>{username}</span> added you as a
          friend
        </div>
      );
    default:
      return <div className={classes.message}> </div>;
  }
};
