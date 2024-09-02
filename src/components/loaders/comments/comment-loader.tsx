import classes from "./comment-loader.module.css";

export const CommentLoader = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.main}>
        <div className={classes.dpContainer}></div>
        <div className={classes.content}>
          <div className={classes.usernameContainer}></div>
          <div className={classes.textContainer}></div>
        </div>
        <div className={classes.likeContainer}></div>
      </div>
    </div>
  );
};
