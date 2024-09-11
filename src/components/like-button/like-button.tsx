import { useState } from "react";
import Link from "next/link";
import classes from "./like-button.module.css";

import { LikeIcon, UnlikeIcon } from "../icons/icons";

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
  const [isLikedState, setIsLikedState] = useState(true);

  return (
    <button
      className={classes.button}
      onClick={() => setIsLikedState((prev) => !prev)}
    >
      {isLikedState ? <LikeIcon /> : <UnlikeIcon />}

      <Link href={url} className={classes.link}>
        <div className={classes.counter}>{count || null}</div>
      </Link>
    </button>
  );
};
