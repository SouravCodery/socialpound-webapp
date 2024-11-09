import clsx from "clsx";
import classes from "./pending-friend-request-loader.module.css";

export const PendingFriendRequestLoader = () => {
  return (
    <div className={clsx(classes.friend, "shadow")}>
      <div className={classes.skeletonProfilePicture}></div>
      <div className={classes.content}>
        <div className={classes.skeletonUsername}></div>
        <div className={classes.skeletonFullName}></div>
      </div>
    </div>
  );
};
