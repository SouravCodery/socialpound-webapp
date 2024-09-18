import Link from "next/link";
import classes from "./header.module.css";

import { PostInterface } from "@/models/interfaces/post.interface";
import { ProfilePicture } from "@/components/profile-picture/profile-picture";
import { DeletePost } from "../delete-post/delete-post";

export const Header = ({
  post,
  isOwnPost,
  updatePostsAfterDeletion,
}: {
  post: PostInterface;
  isOwnPost: boolean;
  updatePostsAfterDeletion: ({ postId }: { postId: string }) => void;
}) => {
  const userProfile = `/profile/${post.user.username.split("@")[0]}`;

  return (
    <div className={classes.header}>
      <Link href={userProfile} className={classes.headerLeft}>
        <ProfilePicture dpURL={post.user.profilePicture} randomizeDP={true} />
        <div className={classes.usernameContainer}>
          &nbsp;{post.user.username.split("@")[0]}
        </div>
      </Link>
      <div className={classes.headerRight}>
        <DeletePost
          isOwnPost={isOwnPost}
          postId={post._id}
          updatePostsAfterDeletion={updatePostsAfterDeletion}
        />
      </div>
    </div>
  );
};
