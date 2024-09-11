import { useState } from "react";
import Link from "next/link";
import classes from "./like-button.module.css";

import { LikeIcon, UnlikeIcon } from "../icons/icons";
import { isPostLikedByUser, likeUserPost } from "@/services/like.services";

export const LikeButton = ({
  // likeOn,
  postId,
  // commentId,
  count,
}: {
  // likeOn: "Post" | "Comment";
  postId: string;
  // commentId?: string;
  count: number;
}) => {
  const url = `/likes/${postId}`;

  const isLiked = isPostLikedByUser({ postId });
  const [isPostLiked, setIsPostLiked] = useState(isLiked);

  const likePost = async () => {
    if (isPostLiked === false) {
      setIsPostLiked(true);
      await likeUserPost({ postId });
      return;
    }

    setIsPostLiked(false);
    // await unlikeUserPost({ postId });
    // return;
  };

  return (
    <button className={classes.button} onClick={likePost}>
      {isPostLiked === false ? <LikeIcon /> : <UnlikeIcon />}

      <Link href={url} className={classes.link}>
        <div className={classes.counter}>{count || null}</div>
      </Link>
    </button>
  );
};
