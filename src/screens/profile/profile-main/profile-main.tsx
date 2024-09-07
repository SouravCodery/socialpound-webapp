import classes from "./profile-main.module.css";
import { ProfilePosts } from "./profile-posts/profile-posts";

export const ProfileMain = () => {
  return (
    <div className={classes.profileMain}>
      <ProfilePosts />
    </div>
  );
};
