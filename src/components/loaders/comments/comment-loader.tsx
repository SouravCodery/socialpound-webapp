import clsx from "clsx";
import classes from "./comment-loader.module.css";

export const CommentLoader = () => {
  return (
    <div className={clsx(classes.comment, "shadow")}>
      <div className={classes.main}>
        <div className={classes.skeletonProfilePicture}></div>
        <div className={classes.content}>
          <div className={classes.skeletonUsername}></div>
          <div className={classes.skeletonText}></div>
        </div>
      </div>
    </div>
  );
};
