import Link from "next/link";
import clsx from "clsx";
import classes from "./comment.module.css";

import { DELETED_USER } from "@/constants/deleted-user";
import { CommentInterface } from "@/models/interfaces/comment.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { DeleteComment } from "./delete-comment/delete-comment";
import { trimUsername } from "@/helpers/misc.helpers";

export const Comment = ({
  comment,
  isAuthorizedToDeleteComment = false,
  updateCommentsAfterDeletion,
}: {
  comment: CommentInterface;
  isAuthorizedToDeleteComment?: boolean;
  updateCommentsAfterDeletion: ({ commentId }: { commentId: string }) => void;
}) => {
  const user = comment?.user || DELETED_USER;
  const userProfile = user?._id ? `/profile/${user?.username}` : `/`;

  return (
    <Link
      href={userProfile}
      className={clsx(classes.comment, "shadow")}
      prefetch={false}
    >
      <div className={classes.main}>
        <ProfilePicture dpURL={user?.profilePicture} scale="medium" />
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
            isAuthorizedToDeleteComment={isAuthorizedToDeleteComment}
            updateCommentsAfterDeletion={updateCommentsAfterDeletion}
          />
        </div>
      </div>
    </Link>
  );
};
