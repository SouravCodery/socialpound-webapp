import Link from "next/link";
import clsx from "clsx";
import classes from "./like.module.css";

import { LikeInterface } from "@/models/interfaces/like.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { DELETED_USER } from "@/constants/deleted-user";
import { trimUsername } from "@/helpers/misc.helpers";

export const Like = ({ like }: { like: LikeInterface }) => {
  const liker = like?.liker || DELETED_USER;

  const userProfile = like?.liker?._id
    ? `/profile/${like?.liker?.username}`
    : `/`;

  return (
    <Link href={userProfile} className={classes.like} prefetch={false}>
      <ProfilePicture dpURL={liker.profilePicture} scale="medium" />
      <div className={classes.content}>
        <div
          className={clsx(
            classes.usernameContainer,
            !liker._id && "deletedUser"
          )}
        >
          {trimUsername(liker.username)}
        </div>
        <div className={clsx(classes.fullName, !liker._id && "deletedUser")}>
          {liker.fullName}
        </div>
      </div>
    </Link>
  );
};
