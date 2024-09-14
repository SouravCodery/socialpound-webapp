import clsx from "clsx";
import classes from "./toast.module.css";

export const Toast = ({
  message,
  index,
}: {
  message: string;
  index: number;
}) => {
  return (
    <div
      className={clsx(
        classes.toast,
        "shadow",
        index === 0 && classes.toastExit
      )}
    >
      {message}
    </div>
  );
};
