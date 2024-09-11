import { useState } from "react";
import Link from "next/link";
import classes from "./like-button.module.css";

import { LikeIcon, UnlikeIcon } from "../icons/icons";
import { isPostLikedByUser } from "@/services/like.services";

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

  return (
    <button
      className={classes.button}
      onClick={() => setIsPostLiked((prev) => !prev)}
    >
      {isPostLiked === false ? <LikeIcon /> : <UnlikeIcon />}

      <Link href={url} className={classes.link}>
        <div className={classes.counter}>{count || null}</div>
      </Link>
    </button>
  );
};
