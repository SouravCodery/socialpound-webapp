import Image from "next/image";

import classes from "./post.module.css";

import {
  MoreOptionsIcon,
  LikeIcon,
  CommentIcon,
  ShareIcon,
  SavedIcon,
} from "@/components/icons/icons";
import { PostInterface } from "@/models/interfaces/post.interface";

export const Post = ({ post }: { post: PostInterface }) => {
  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <div className={classes.dpContainer}>
            <Image
              src={post.user.profilePicture}
              alt="Profile Picture"
              fill
              sizes="60px"
            />
          </div>
          <div className={classes.usernameContainer}>
            {post.user.username.split("@")[0]}
          </div>
        </div>
        <div className={classes.headerRight}>
          <MoreOptionsIcon />
        </div>
      </div>
      <div className={classes.content}>
        <Image
          src={post.content[0].url}
          alt="Post Image"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={classes.asset}
        />
      </div>
      <div className={classes.footer}>
        <div className={classes.postActions}>
          <div className={classes.postActionsLeft}>
            <div className={classes.temporaryIconContainer}>
              <LikeIcon />
            </div>
            <div className={classes.temporaryIconContainer}>
              <CommentIcon />
            </div>
            <div className={classes.temporaryIconContainer}>
              <ShareIcon />
            </div>
          </div>
          <div className={classes.postActionsRight}>
            <div className={classes.temporaryIconContainer}>
              <SavedIcon />
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
