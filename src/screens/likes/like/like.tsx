import classes from "./like.module.css";

import { LikeInterface } from "@/models/interfaces/like.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";

export const Like = ({ like }: { like: LikeInterface }) => {
  return (
    <div className={classes.like}>
      <ProfilePicture
        dpURL={like.liker.profilePicture}
        randomizeDP
        scale="medium"
      />
      <div className={classes.content}>
        <div className={classes.usernameContainer}>
          {like.liker.username.split("@")[0]}
        </div>
        <div className={classes.fullName}>{like.liker.fullName}</div>
      </div>
    </div>
  );
};
