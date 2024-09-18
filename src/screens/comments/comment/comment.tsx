import clsx from "clsx";
import classes from "./comment.module.css";

import { CommentInterface } from "@/models/interfaces/comment.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { DeleteComment } from "./delete-comment/delete-comment";

export const Comment = ({
  comment,
  isOwnComment = false,
  updateCommentsAfterDeletion,
}: {
  comment: CommentInterface;
  isOwnComment?: boolean;
  updateCommentsAfterDeletion: ({ commentId }: { commentId: string }) => void;
}) => {
  return (
    <div className={clsx(classes.comment, "shadow")}>
      <div className={classes.main}>
        <ProfilePicture dpURL={comment.user.profilePicture} randomizeDP />
        <div className={classes.content}>
          <div className={classes.usernameContainer}>
            {comment.user.username.split("@")[0]}
          </div>
          <div>{comment.text}</div>
        </div>
        <div className={classes.actionsContainer}>
          <DeleteComment
            commentId={comment._id}
            isOwnComment={isOwnComment}
            updateCommentsAfterDeletion={updateCommentsAfterDeletion}
          />
        </div>
      </div>
    </div>
  );
};
