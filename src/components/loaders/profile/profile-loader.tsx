import classes from "./profile-loader.module.css";

import { ProfileHeaderLoader } from "../profile-header/profile-header-loader";
import { ProfilePostLoader } from "../profile-post/profile-post-loader";

export const ProfileLoader = () => {
  return (
    <div className={classes.profile}>
      <ProfileHeaderLoader />
      <div className={classes.feed}>
        {[...Array(9)].map((_, index) => (
          <ProfilePostLoader key={index} />
        ))}
      </div>
    </div>
  );
};
