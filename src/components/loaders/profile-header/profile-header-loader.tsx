import classes from "./profile-header-loader.module.css";

export const ProfileHeaderLoader = () => {
  return (
    <div className={classes.profileHeader}>
      <div className={classes.username}></div>
      <div className={classes.dpAndCounts}>
        <div className={classes.dpAndName}>
          <div className={classes.skeletonProfilePicture}></div>
          <div className={classes.skeletonName}></div>
        </div>

        <div className={classes.counters}>
          <div className={classes.counter}>
            <div className={classes.skeletonCount}></div>
            <div className={classes.skeletonCounterName}></div>
          </div>

          <div className={classes.counter}>
            <div className={classes.skeletonCount}></div>
            <div className={classes.skeletonCounterName}></div>
          </div>

          <div className={classes.counter}>
            <div className={classes.skeletonCount}></div>
            <div className={classes.skeletonCounterName}></div>
          </div>
        </div>
      </div>

      <div className={classes.skeletonBio}></div>

      <div className={classes.profileActions}>
        <div className={classes.skeletonProfileActionsButton}></div>
      </div>
    </div>
  );
};
