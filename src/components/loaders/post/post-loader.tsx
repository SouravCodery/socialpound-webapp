//Thanks to my buddy, ChatGPT for giving me this loader based on my post component. Hail ChatGPT!
import classes from "./post-loader.module.css";

export const PostLoader = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <div className={classes.dpContainer}></div>
          <div className={classes.usernameContainer}></div>
        </div>
        <div className={classes.headerRight}></div>
      </div>
      <div className={classes.content}></div>
      <div className={classes.footer}>
        <div className={classes.postActions}>
          <div className={classes.postActionsLeft}>
            <div className={classes.actionContainer}></div>
            <div className={classes.actionContainer}></div>
            <div className={classes.actionContainer}></div>
          </div>
          <div className={classes.postActionsRight}>
            <div className={classes.actionContainer}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
