import classes from "./like-loader.module.css";

export const LikeLoader = () => {
  return (
    <div className={classes.like}>
      <div className={classes.skeletonProfilePicture}></div>
      <div className={classes.content}>
        <div className={classes.skeletonUsername}></div>
        <div className={classes.skeletonFullName}></div>
      </div>
    </div>
  );
};