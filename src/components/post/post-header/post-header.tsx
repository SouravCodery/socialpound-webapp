import clsx from "clsx";
import Link from "next/link";
import classes from "./post-header.module.css";

import { PostInterface } from "@/models/interfaces/post.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { DeletePost } from "../delete-post/delete-post";
import { DELETED_USER } from "@/constants/deleted-user";
import { trimUsername } from "@/helpers/misc.helpers";

export const PostHeader = ({
  post,
  isOwnPost,
  updatePostsAfterDeletion,
}: {
  post: PostInterface;
  isOwnPost: boolean;
  updatePostsAfterDeletion?: ({ postId }: { postId: string }) => void;
}) => {
  const user = post?.user || DELETED_USER;

  const userProfile = post?.user?._id
    ? `/profile/${post?.user?.username}`
    : `/`;

  return (
    <div className={classes.header}>
      <Link href={userProfile} className={classes.headerLeft} prefetch={false}>
        <ProfilePicture dpURL={user?.profilePicture} />
        <div
          className={clsx(
            classes.usernameContainer,
            !user._id && "deletedUser"
          )}
        >
          &nbsp;{trimUsername(user?.username)}
        </div>
      </Link>
      <div className={classes.headerRight}>
        {updatePostsAfterDeletion && (
          <DeletePost
            isOwnPost={isOwnPost}
            postId={post._id}
            updatePostsAfterDeletion={updatePostsAfterDeletion}
          />
        )}
      </div>
    </div>
  );
};
