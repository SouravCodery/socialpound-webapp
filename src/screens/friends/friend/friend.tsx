import Link from "next/link";
import clsx from "clsx";
import classes from "./friend.module.css";

import { SubDocumentUserInterface } from "@/models/interfaces/user.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { trimUsername } from "@/helpers/misc.helpers";

export const Friend = ({ friend }: { friend: SubDocumentUserInterface }) => {
  const userProfile = `/profile/${friend.username}`;

  return (
    <Link
      href={userProfile}
      className={clsx(classes.friend, "shadow")}
      prefetch={false}
    >
      <ProfilePicture dpURL={friend.profilePicture} scale="medium" />
      <div className={classes.content}>
        <div className={clsx(classes.usernameContainer)}>
          {trimUsername(friend.username)}
        </div>
        <div className={clsx(classes.fullName)}>{friend.fullName}</div>
      </div>
    </Link>
  );
};
