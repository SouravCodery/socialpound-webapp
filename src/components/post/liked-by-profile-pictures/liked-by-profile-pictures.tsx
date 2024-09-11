import clsx from "clsx";
import Link from "next/link";

import classes from "./liked-by-profile-pictures.module.css";

export const LikedByProfilePictures = ({
  postId,
  likesCount,
  isPostLiked,
}: {
  postId: string;
  likesCount: number;
  isPostLiked: boolean;
}) => {
  if (likesCount < 1) {
    return null;
  }

  let likeText = isPostLiked
    ? `Liked by ${likesCount - 1} others`
    : `Liked by ${likesCount}`;

  if (isPostLiked && likesCount == 1) {
    likeText = "Liked by you";
  }

  return (
    <Link href={`/likes/${postId}`} className={classes.likedBy}>
      <div className={classes.likedByGroup}>
        <span
          className={clsx(classes.likedByProfilePicture)}
          style={{ zIndex: 5 }}
        >
          😍
        </span>
        <span
          className={clsx(classes.likedByProfilePicture)}
          style={{ zIndex: 4, transform: "translateX(-40%)" }}
        >
          😎
        </span>

        <span
          className={clsx(classes.likedByProfilePicture)}
          style={{ zIndex: 3, transform: "translateX(-80%)" }}
        >
          🤩
        </span>
      </div>
      <div className={classes.likedByText}>{likeText}</div>
    </Link>
  );
};
