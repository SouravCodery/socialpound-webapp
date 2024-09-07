import classes from "./profile-main.module.css";
import { ProfilePosts } from "./profile-posts/profile-posts";

export const ProfileMain = ({ userId }: { userId: string }) => {
  return (
    <div className={classes.profileMain}>
      <ProfilePosts userId={userId} />
    </div>
  );
};
