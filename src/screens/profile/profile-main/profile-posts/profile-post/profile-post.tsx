import Image from "next/image";
import { PostType } from "@/models/types/post.types";

import classes from "./profile-post.module.css";

export const ProfilePost = ({ post }: { post: PostType }) => {
  return (
    <div className={classes.content}>
      <Image
        src={post.images[0]}
        alt="Post Image"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={classes.asset}
      />
    </div>
  );
};
