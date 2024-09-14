import clsx from "clsx";
import classes from "./toast.module.css";
import { ToastType } from "@/models/types/toast.types";

export const Toast = ({
  toast,
  index,
}: {
  toast: ToastType;
  index: Number;
}) => {
  const { type, message } = toast;

  return (
    <div
      className={clsx(
        classes.toast,
        "shadow",
        index === 0 && classes.toastExit,
        classes[type]
      )}
    >
      {message}
    </div>
  );
};
