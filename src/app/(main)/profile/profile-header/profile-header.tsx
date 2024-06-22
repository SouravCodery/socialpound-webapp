import { ProfileNavigatorIcon } from "@/components/profile-navigator-icon/profile-navigator-icon";
import classes from "./profile-header.module.css";

export const ProfileHeader = () => {
  return (
    <div className={classes.profileHeader}>
      <div className={classes.dpAndCounts}>
        <div className={classes.dpAndName}>
          <ProfileNavigatorIcon upScale={true} />
          <div className={classes.name}>Sourav Choudhary</div>
        </div>

        <div className={classes.counters}>
          <div className={classes.counter}>
            <div className={classes.count}>71</div>
            <div className={classes.counterName}>posts</div>
          </div>

          <div className={classes.counter}>
            <div className={classes.count}>194</div>
            <div className={classes.counterName}>followers</div>
          </div>

          <div className={classes.counter}>
            <div className={classes.count}>1,096</div>
            <div className={classes.counterName}>following</div>
          </div>
        </div>
      </div>

      <div className={classes.bio}>
        Software Engineer | Full Stack Developer | MERN | The Combination of One
        Up Quark and Two Down Quarks in an ⚛️!
      </div>

      <div className={classes.profileActions}>
        <button>Edit Profile</button>
        <button>Share Profile</button>
      </div>
    </div>
  );
};
