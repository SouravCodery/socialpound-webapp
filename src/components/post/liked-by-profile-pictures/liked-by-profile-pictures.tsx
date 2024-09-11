import clsx from "clsx";
import Link from "next/link";

import classes from "./liked-by-profile-pictures.module.css";

export const LikedByProfilePictures = ({
  postId,
  likesCount,
}: {
  postId: string;
  likesCount: number;
}) => {
  if (!likesCount) {
    return null;
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
      <div className={classes.likedByText}>Liked by {likesCount}</div>
    </Link>
  );
};
