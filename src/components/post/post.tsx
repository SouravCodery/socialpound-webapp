"use client";

import { useState } from "react";
import clsx from "clsx";
import classes from "./post.module.css";

import { PostInterface } from "@/models/interfaces/post.interface";
import { PostHeader } from "./post-header/post-header";
import { Content } from "./content/content";
import { LikedByUsersProfilePicture } from "./liked-by-users-profile-picture/liked-by-users-profile-picture";

import {
  isPostLikedByUser,
  likeUserPost,
  unlikeUserPost,
} from "@/services/like.services";
import { PostReactions } from "./post-reactions/post-reactions";
import { trimUsername } from "@/helpers/misc.helpers";
import { DELETED_USER } from "@/constants/deleted-user";

export const Post = ({
  post,
  isOwnPost = false,
  updatePostsAfterDeletion,
}: {
  post: PostInterface;
  isOwnPost?: boolean;
  updatePostsAfterDeletion?: ({ postId }: { postId: string }) => void;
}) => {
  const postId = post._id;
  const user = post?.user || DELETED_USER;
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
      <PostHeader
        post={post}
        isOwnPost={isOwnPost}
        updatePostsAfterDeletion={updatePostsAfterDeletion}
      />
      <Content post={post} isLiked={isLiked} likePost={likePost} />

      <div className={classes.footer}>
        <PostReactions
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
            <span
              className={clsx(
                classes.captionUsername,
                !user._id && "deletedUser"
              )}
            >
              {trimUsername(user?.username)}
            </span>
            &nbsp;
            <span>{post.caption}</span>
          </div>
        )}
      </div>
    </div>
  );
};
