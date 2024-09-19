import Link from "next/link";
import classes from "./notification.module.css";

import { NotificationInterface } from "@/models/interfaces/notification.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { Constants } from "@/constants/constants";
import { NotificationMessage } from "./notification-message/notification-message";
import { DELETED_USER } from "@/constants/deleted-user";

export const Notification = ({
  notification,
}: {
  notification: NotificationInterface;
}) => {
  const contentPath = notification.post.content[0].url;

  const href = notification.type.startsWith("like")
    ? `/likes/${notification.post._id}`
    : `/comments/${notification.post._id}`;

  const sender = notification?.sender || DELETED_USER;

  return (
    <Link href={href} className={classes.notification}>
      <ProfilePicture dpURL={sender.profilePicture} scale="medium" />
      <div className={classes.message}>
        <NotificationMessage notification={notification} />
      </div>
      <div className={classes.content}>
        <img
          src={`${Constants.CDN_BASE_URL}/${contentPath}`}
          alt="Post Image"
          className={classes.asset}
          loading="lazy"
        />
      </div>
    </Link>
  );
};
