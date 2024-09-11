import clsx from "clsx";
import Link from "next/link";

import classes from "./liked-by-users-profile-picture.module.css";

export const LikedByUsersProfilePicture = ({
  postId,
  likesCount,
  isPostLiked,
  isLiked,
}: {
  postId: string;
  likesCount: number;
  isPostLiked: boolean;
  isLiked: boolean;
}) => {
  if (likesCount < 1) {
    return null;
  }

  if (isLiked === true && likesCount === 1 && isPostLiked === false) {
    return null;
  }

  const countApartFromUser = likesCount - 1;
  let likeText = isPostLiked
    ? `Liked by ${countApartFromUser} other${countApartFromUser > 1 ? "s" : ""}`
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
