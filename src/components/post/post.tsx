"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import classes from "./post.module.css";
import { Constants } from "@/constants/constants";

import { MoreOptionsIcon, CommentIcon } from "@/components/icons/icons";
import { ProfilePicture } from "../profile-picture/profile-picture";
import { PostInterface } from "@/models/interfaces/post.interface";
import { LikeButton } from "../like-button/like-button";
import { LikedByProfilePictures } from "./liked-by-profile-pictures/liked-by-profile-pictures";
import {
  isPostLikedByUser,
  likeUserPost,
  unlikeUserPost,
} from "@/services/like.services";

export const Post = ({ post }: { post: PostInterface }) => {
  const postId = post._id;

  const isLiked = isPostLikedByUser({ postId });

  const [errorInMedia, setErrorInMedia] = useState<boolean>(false);
  const [isPostLiked, setIsPostLiked] = useState(isLiked);
  const [isProcessing, setIsProcessing] = useState(false);

  const likePost = async () => {
    setIsProcessing(true);

    if (isProcessing) return;

    if (isPostLiked === false) {
      setIsPostLiked(true);
      await likeUserPost({ postId });
    } else {
      setIsPostLiked(false);
      await unlikeUserPost({ postId });
    }

    setIsProcessing(false);
  };

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
        onDoubleClick={() => {
          if (isLiked === false) {
            likePost();
          }
        }}
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
            <LikeButton
              postId={post._id}
              count={post.likesCount}
              isPostLiked={isPostLiked}
              likePost={likePost}
            />
            <Link
              href={`/comments/${post._id}`}
              className={clsx(classes.postActionLink, classes.link)}
            >
              <CommentIcon />{" "}
              <div className={classes.counter}>
                {post.commentsCount || null}
              </div>
            </Link>
          </div>
          <div className={classes.postActionsRight}>
            {/* <div>
              <SavedIcon />
            </div> */}
          </div>
        </div>
        <LikedByProfilePictures
          postId={post._id}
          likesCount={post.likesCount}
          isPostLiked={isPostLiked}
        />
        {post.caption && (
          <div className={classes.captionContainer}>
            <div>{post.user.username.split("@")[0]}</div>
            &nbsp;
            <div>{post.caption}</div>
          </div>
        )}
      </div>
    </div>
  );
};
