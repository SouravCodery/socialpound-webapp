import Image from "next/image";

import classes from "./post.module.css";
import { PostType } from "../../types/post.types";
import {
  MoreOptionsIcon,
  LikeIcon,
  CommentIcon,
  ShareIcon,
  SavedIcon,
} from "../icons/icons";

export const Post = ({ post }: { post: PostType }) => {
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <div className={classes.dpContainer}>
            <Image src={post.dp} alt="Profile Picture" fill sizes="60px" />
          </div>
          <div className={classes.usernameContainer}>{post.userName}</div>
        </div>
        <div className={classes.headerRight}>
          <MoreOptionsIcon />
        </div>
      </div>
      <div className={classes.content}>
        <Image
          src={post.images[0]}
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
