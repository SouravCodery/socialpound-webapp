import { IconWrapper } from "@/components/atoms/icon-wrapper/icon-wrapper";
import { PostsIcon, ReelsIcon, TaggedIcon } from "@/components/icons/icons";

import classes from "./profile-main.module.css";
import { ProfilePosts } from "./profile-posts/profile-posts";

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

      <ProfilePosts />
    </div>
  );
};
