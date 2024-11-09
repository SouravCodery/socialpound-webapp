import clsx from "clsx";
import classes from "./friend-loader.module.css";

export const FriendLoader = () => {
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
