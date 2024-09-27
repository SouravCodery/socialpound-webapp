import classes from "./like-button.module.css";
import { LikeIcon, UnlikeIcon } from "../icons/icons";

export const LikeButton = ({
  count,
  currentPostLikeStatus,
  likePost,
}: {
  count: number;
  currentPostLikeStatus: boolean;
  likePost: () => Promise<void>;
}) => {
  return (
    <>
      <button className={classes.button} onClick={likePost}>
        {currentPostLikeStatus === false ? <LikeIcon /> : <UnlikeIcon />}
      </button>
      <div title="Like Count" className={classes.counter}>
        {count > 0 ? count : null}
      </div>
    </>
  );
};
