import clsx from "clsx";
import classes from "./notification-loader.module.css";

export const NotificationLoader = () => {
  return (
    <div className={clsx(classes.notification, "shadow")}>
      <div className={classes.skeletonProfilePicture}></div>
      <div className={classes.message}>
        <div className={classes.skeletonMessage}></div>
        <div className={classes.skeletonMessage}></div>
      </div>
      <div className={classes.content}>
        <div className={classes.skeletonAsset}></div>
      </div>
    </div>
  );
};
