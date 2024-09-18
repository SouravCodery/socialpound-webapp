import clsx from "clsx";
import Link from "next/link";
import classes from "./post-reactions.module.css";

import { LikeButton } from "@/components/like-button/like-button";
import { CommentIcon } from "@/components/icons/icons";
import { PostInterface } from "@/models/interfaces/post.interface";

export const PostReactions = ({
  post,
  currentLikeCount,
  currentPostLikeStatus,

  likePost,
}: {
  post: PostInterface;
  currentLikeCount: number;
  currentPostLikeStatus: boolean;

  likePost: () => Promise<void>;
}) => {
  return (
    <div className={classes.postReactions}>
      <div className={classes.postReactionsLeft}>
        <LikeButton
          postId={post._id}
          count={currentLikeCount}
          currentPostLikeStatus={currentPostLikeStatus}
          likePost={likePost}
        />
        <Link
          href={`/comments/${post._id}`}
          className={clsx(classes.postReactionLink)}
        >
          <CommentIcon />{" "}
          <div className={classes.counter}>{post.commentsCount || null}</div>
        </Link>
      </div>
    </div>
  );
};
