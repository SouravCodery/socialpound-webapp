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
    <div className={clsx(classes.comment, "shadow")}>
      <div className={classes.main}>
        <Link href={userProfile} prefetch={false}>
          <ProfilePicture dpURL={user?.profilePicture} scale="medium" />
        </Link>
        <div className={classes.content}>
          <Link
            href={userProfile}
            prefetch={false}
            className={clsx(
              classes.usernameContainer,
              !user._id && "deletedUser"
            )}
          >
            {trimUsername(user?.username)}
          </Link>
          <div>{comment.text}</div>
        </div>
        <div
          className={classes.actionsContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <DeleteComment
            commentId={comment._id}
            isAuthorizedToDeleteComment={isAuthorizedToDeleteComment}
            updateCommentsAfterDeletion={updateCommentsAfterDeletion}
          />
        </div>
      </div>
    </div>
  );
};
