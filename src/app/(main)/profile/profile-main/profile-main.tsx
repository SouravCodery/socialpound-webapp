import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { PostsIcon, ReelsIcon, TaggedIcon } from "@/components/icons/icons";

import classes from "./profile-main.module.css";

export const ProfileMain = () => {
  return (
    <div className={classes.profileMain}>
      <div className={classes.profileMainHeader}>
        <IconWrapper>
          <PostsIcon />
        </IconWrapper>
        <IconWrapper>
          <ReelsIcon />
        </IconWrapper>
        <IconWrapper>
          <TaggedIcon />
        </IconWrapper>
      </div>
      <div className={classes.profileMainBody}>Main</div>
    </div>
  );
};
