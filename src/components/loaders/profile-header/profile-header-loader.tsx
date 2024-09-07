import classes from "./profile-header-loader.module.css";

export const ProfileHeaderLoader = () => {
  return (
    <div className={classes.profileHeader}>
      <div className={classes.dpAndCounts}>
        <div className={classes.dpAndName}>
          <div className={classes.skeletonDp}></div>
          <div className={classes.name}>
            <div className={classes.skeletonName}></div>
            <div className={classes.skeletonUsername}></div>
          </div>
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

      <div className={classes.skeletonProfileActions}></div>
    </div>
  );
};
