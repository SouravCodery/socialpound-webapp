import clsx from "clsx";
import classes from "./comment.module.css";

import { CommentInterface } from "@/models/interfaces/comment.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { DeleteComment } from "./delete-comment/delete-comment";
import { DELETED_USER } from "@/constants/deleted-user";
import { trimUsername } from "@/helpers/misc.helpers";

export const Comment = ({
  comment,
  isOwnComment = false,
  updateCommentsAfterDeletion,
}: {
  comment: CommentInterface;
  isOwnComment?: boolean;
  updateCommentsAfterDeletion: ({ commentId }: { commentId: string }) => void;
}) => {
  const user = comment?.user || DELETED_USER;

  return (
    <div className={clsx(classes.comment, "shadow")}>
      <div className={classes.main}>
        <ProfilePicture dpURL={user?.profilePicture} />
        <div className={classes.content}>
          <div
            className={clsx(
              classes.usernameContainer,
              !user._id && "deletedUser"
            )}
          >
            {trimUsername(user?.username)}
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
