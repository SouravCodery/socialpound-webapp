import clsx from "clsx";
import classes from "./like.module.css";

import { LikeInterface } from "@/models/interfaces/like.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { DELETED_USER } from "@/constants/deleted-user";
import Link from "next/link";

export const Like = ({ like }: { like: LikeInterface }) => {
  const liker = like?.liker || DELETED_USER;

  const userProfile = like?.liker?._id
    ? `/profile/${like?.liker?.username.split("@")[0]}`
    : `/`;

  return (
    <Link href={userProfile} className={classes.like}>
      <ProfilePicture dpURL={liker.profilePicture} scale="medium" />
      <div className={classes.content}>
        <div
          className={clsx(
            classes.usernameContainer,
            !liker._id && "deletedUser"
          )}
        >
          {liker.username.split("@")[0]}
        </div>
        <div className={clsx(classes.fullName, !liker._id && "deletedUser")}>
          {liker.fullName}
        </div>
      </div>
    </Link>
  );
};
