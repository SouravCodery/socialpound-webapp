import classes from "./profile-post-loader.module.css";

export const ProfilePostLoader = () => {
  return (
    <div className={classes.profilePost}>
      <div className={classes.skeletonAsset}></div>
    </div>
  );
};
