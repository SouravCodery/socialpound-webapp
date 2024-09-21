import clsx from "clsx";
import Link from "next/link";

import classes from "./liked-by-users-profile-picture.module.css";

export const LikedByUsersProfilePicture = ({
  postId,
  likesCount,
  currentPostLikeStatus,
  isLiked,
}: {
  postId: string;
  likesCount: number;
  currentPostLikeStatus: boolean;
  isLiked: boolean;
}) => {
  if (likesCount < 1) {
    return null;
  }

  if (isLiked && !currentPostLikeStatus && likesCount === 1) {
    return null;
  }

  let likeText = `Liked by ${likesCount}`;

  if (isLiked && currentPostLikeStatus && likesCount === 1) {
    likeText = "Liked by you";
  } else if (isLiked && currentPostLikeStatus && likesCount > 1) {
    const othersLikeCount = likesCount - 1;

    likeText = `Liked by ${othersLikeCount} other${
      othersLikeCount > 1 ? "s" : ""
    }`;
  }

  return (
    <Link
      href={`/likes/${postId}`}
      className={classes.likedBy}
      prefetch={false}
    >
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
