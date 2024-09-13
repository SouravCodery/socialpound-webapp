import clsx from "clsx";
import classes from "./toasts.module.css";

export const Toasts = () => {
  return (
    <div className={clsx(classes.toasts, "shadow")}>
      Your comment will reflect soon! Your comment will reflect soon!
    </div>
  );
};
