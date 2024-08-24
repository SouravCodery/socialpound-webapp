import Image from "next/image";
import classes from "./comment.module.css";

import { CommentInterface } from "@/models/interfaces/comment.interface";
import { LikeIcon } from "@/components/icons/icons";

export const Comment = ({ comment }: { comment: CommentInterface }) => {
  return (
    <div className={classes.comment}>
      <div className={classes.main}>
        <div className={classes.dpContainer}>
          <Image
            src={comment.user.profilePicture}
            alt="Profile Picture"
            fill
            sizes="60px"
          />
        </div>
        <div className={classes.content}>
          <div className={classes.usernameContainer}>
            {comment.user.username.split("@")[0]}
          </div>
          <div>{comment.text}</div>
        </div>
        <div className={classes.likeContainer}>
          <LikeIcon />
        </div>
      </div>
      {/* <div className={classes.footer}>View all replies</div> */}
    </div>
  );
};
