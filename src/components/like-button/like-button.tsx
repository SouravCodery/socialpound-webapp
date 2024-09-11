import Link from "next/link";
import classes from "./like-button.module.css";

import { LikeIcon, UnlikeIcon } from "../icons/icons";

export const LikeButton = ({
  postId,
  count,
  isPostLiked,
  likePost,
}: {
  postId: string;
  count: number;
  isPostLiked: boolean;
  likePost: () => Promise<void>;
}) => {
  const url = `/likes/${postId}`;

  return (
    <button className={classes.button} onClick={likePost}>
      {isPostLiked === false ? <LikeIcon /> : <UnlikeIcon />}

      <Link href={url} className={classes.link}>
        <div className={classes.counter}>{count > 0 ? count : null}</div>
      </Link>
    </button>
  );
};
