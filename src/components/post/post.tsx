"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import classes from "./post.module.css";

import { CommentIcon } from "@/components/icons/icons";
import { ProfilePicture } from "../profile-picture/profile-picture";
import { PostInterface } from "@/models/interfaces/post.interface";
import { LikeButton } from "../like-button/like-button";
import { LikedByUsersProfilePicture } from "./liked-by-users-profile-picture/liked-by-users-profile-picture";
import {
  isPostLikedByUser,
  likeUserPost,
  unlikeUserPost,
} from "@/services/like.services";

import { DeletePost } from "./delete-post/delete-post";
import { Content } from "./content/content";

export const Post = ({
  post,
  isOwnPost = false,
  updatePostsAfterDeletion,
}: {
  post: PostInterface;
  isOwnPost?: boolean;
  updatePostsAfterDeletion: ({ postId }: { postId: string }) => void;
}) => {
  const postId = post._id;
  const isLiked = isPostLikedByUser({ postId });

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPostLikeStatus, setCurrentPostLikeStatus] = useState(isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(post.likesCount);

  const likePost = async () => {
    setIsProcessing(true);

    if (isProcessing) return;

    if (currentPostLikeStatus === false) {
      setCurrentPostLikeStatus(true);
      setCurrentLikeCount((prev) => prev + 1);
      await likeUserPost({ postId });
    } else {
      setCurrentPostLikeStatus(false);
      setCurrentLikeCount((prev) => prev - 1);
      await unlikeUserPost({ postId });
    }

    setIsProcessing(false);
  };

  const userProfile = `/profile/${post.user.username.split("@")[0]}`;

  return (
    <div className={clsx(classes.post, "shadow")}>
      {/* Header */}
      <div className={classes.header}>
        <Link href={userProfile} className={classes.headerLeft}>
          <ProfilePicture dpURL={post.user.profilePicture} randomizeDP={true} />
          <div className={classes.usernameContainer}>
            &nbsp;{post.user.username.split("@")[0]}
          </div>
        </Link>
        <div className={classes.headerRight}>
          <DeletePost
            isOwnPost={isOwnPost}
            postId={post._id}
            updatePostsAfterDeletion={updatePostsAfterDeletion}
          />
        </div>
      </div>

      {/* Content */}
      <Content post={post} isLiked={isLiked} likePost={likePost} />

      {/* Footer */}
      <div className={classes.footer}>
        {/* Reactions */}
        <div className={classes.postActions}>
          <div className={classes.postActionsLeft}>
            <LikeButton
              postId={post._id}
              count={currentLikeCount}
              currentPostLikeStatus={currentPostLikeStatus}
              likePost={likePost}
            />
            <Link
              href={`/comments/${post._id}`}
              className={clsx(classes.postActionLink)}
            >
              <CommentIcon />{" "}
              <div className={classes.counter}>
                {post.commentsCount || null}
              </div>
            </Link>
          </div>
        </div>

        {/* Liked by */}
        <LikedByUsersProfilePicture
          postId={post._id}
          likesCount={currentLikeCount}
          currentPostLikeStatus={currentPostLikeStatus}
          isLiked={isLiked}
        />

        {/* Caption */}
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
