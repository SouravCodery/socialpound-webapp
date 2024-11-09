import Link from "next/link";
import clsx from "clsx";
import classes from "./pending-friend-request.module.css";

import { PendingFriendshipRequest } from "@/models/interfaces/friendship.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { trimUsername } from "@/helpers/misc.helpers";

export const PendingFriendRequest = ({
  pendingFriendRequest,
}: {
  pendingFriendRequest: PendingFriendshipRequest;
}) => {
  const requester = pendingFriendRequest.requester;
  const userProfile = `/profile/${requester.username}`;

  return (
    <Link
      href={userProfile}
      className={clsx(classes.pendingFriendRequest, "shadow")}
      prefetch={false}
    >
      <ProfilePicture dpURL={requester.profilePicture} scale="medium" />
      <div className={classes.content}>
        <div className={clsx(classes.usernameContainer)}>
          {trimUsername(requester.username)}
        </div>
        <div className={clsx(classes.fullName)}>{requester.fullName}</div>
      </div>
    </Link>
  );
};
