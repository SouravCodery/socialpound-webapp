"use client";

import { useState } from "react";
import clsx from "clsx";
import classes from "./post.module.css";

import { PostInterface } from "@/models/interfaces/post.interface";
import { Header } from "./header/header";
import { Content } from "./content/content";
import { LikedByUsersProfilePicture } from "./liked-by-users-profile-picture/liked-by-users-profile-picture";

import {
  isPostLikedByUser,
  likeUserPost,
  unlikeUserPost,
} from "@/services/like.services";
import { Reactions } from "./reactions/reactions";

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

  return (
    <div className={clsx(classes.post, "shadow")}>
      <Header
        post={post}
        isOwnPost={isOwnPost}
        updatePostsAfterDeletion={updatePostsAfterDeletion}
      />
      <Content post={post} isLiked={isLiked} likePost={likePost} />

      <div className={classes.footer}>
        <Reactions
          post={post}
          currentLikeCount={currentLikeCount}
          currentPostLikeStatus={currentPostLikeStatus}
          likePost={likePost}
        />

        <LikedByUsersProfilePicture
          postId={post._id}
          likesCount={currentLikeCount}
          currentPostLikeStatus={currentPostLikeStatus}
          isLiked={isLiked}
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
