import Link from "next/link";
import Image from "next/image";

import classes from "./notification.module.css";
import { Constants } from "@/constants/constants";
import { DELETED_USER } from "@/constants/deleted-user";
import { NotificationInterface } from "@/models/interfaces/notification.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { NotificationMessage } from "./notification-message/notification-message";

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
  const senderProfile = sender?._id ? `/profile/${sender?.username}` : `/`;

  return (
    <div className={classes.notification}>
      <Link href={senderProfile} prefetch={false}>
        <ProfilePicture dpURL={sender.profilePicture} scale="medium" />
      </Link>
      <div className={classes.message}>
        <NotificationMessage notification={notification} />
      </div>
      <Link className={classes.content} href={href} prefetch={false}>
        <Image
          src={`${Constants.CDN_BASE_URL}/${contentPath}`}
          alt="Post Image"
          className={classes.asset}
          fill={true}
          priority={true}
          sizes="calc(3rem - 2px)"
        />
      </Link>
    </div>
  );
};
