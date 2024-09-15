import classes from "./no-posts.module.css";

export const NoPosts = () => {
  return (
    <div className={classes.noPosts}>
      <h2>No posts yet! 🧐 </h2>
      <div className={classes.noPostsSub}>
        Guess it’s a ghost town in here… 👻
      </div>
    </div>
  );
};
