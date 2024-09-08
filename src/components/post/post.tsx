"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import classes from "./post.module.css";
import { Constants } from "@/constants/constants";

import {
  MoreOptionsIcon,
  LikeIcon,
  CommentIcon,
  ShareIcon,
  SavedIcon,
} from "@/components/icons/icons";
import { ProfilePicture } from "../profile-picture/profile-picture";
import { PostInterface } from "@/models/interfaces/post.interface";

export const Post = ({ post }: { post: PostInterface }) => {
  const [errorInMedia, setErrorInMedia] = useState<boolean>(false);

  const handleErrorInMedia = () => {
    setErrorInMedia(true);
  };

  return (
    <div className={classes.post}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <ProfilePicture dpURL={post.user.profilePicture} randomizeDP={true} />
          <div className={classes.usernameContainer}>
            &nbsp;{post.user.username.split("@")[0]}
          </div>
        </div>
        <div className={classes.headerRight}>
          <MoreOptionsIcon />
        </div>
      </div>
      <div
        className={classes.content}
        style={{ aspectRatio: post.content[0].aspectRatio ?? 1 }}
      >
        {errorInMedia === false ? (
          <img
            src={`${Constants.CDN_BASE_URL}/${post.content[0].url}`}
            alt="Post Image"
            className={classes.asset}
            onError={handleErrorInMedia}
            loading="lazy"
          />
        ) : (
          <div className={classes.mediaError}>
            <p>🚧 Oops! The picture took a detour. Maybe it’s shy? 😅 📦 📸</p>
            <p>⚡ There might be something wrong with the CDN 🛰️</p>
            <p>Try reloading, or imagine the coolest image ever here! 🖼️✨</p>
          </div>
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.postActions}>
          <div className={classes.postActionsLeft}>
            <Link href={`/likes/${post._id}`}>
              <LikeIcon />
            </Link>
            <Link
              href={`/comments/${post._id}`}
              className={clsx(classes.postActionLink)}
            >
              <CommentIcon />
            </Link>
            <Link href={`/share/${post._id}`}>
              <ShareIcon />
            </Link>
          </div>
          <div className={classes.postActionsRight}>
            <div>
              <SavedIcon />
            </div>
          </div>
        </div>
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
