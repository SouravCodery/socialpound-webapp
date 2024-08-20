import Link from "next/link";
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
            <Link
              href={`/likes/${post._id}`}
              className={classes.postActionLink}
            >
              <LikeIcon />
            </Link>
            <Link
              href={`/comments/${post._id}`}
              className={classes.postActionLink}
            >
              <CommentIcon />
            </Link>
            <Link
              href={`/share/${post._id}`}
              className={classes.postActionLink}
            >
              <ShareIcon />
            </Link>
          </div>
          <div className={classes.postActionsRight}>
            <div className={classes.postActionLink}>
              <SavedIcon />
            </div>
          </div>
        </div>
        <div></div>
        {post.caption && (
          <div className={classes.captionContainer}>
            <div>{post.user.username.split("@")[0]}</div>
            &nbsp;
            <div>{post.caption}</div>
          </div>
        )}
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
