"use client";

import classes from "./toasts.module.css";
import { Toast } from "./toast/toast";
import { useEffect, useState } from "react";

export const Toasts = () => {
  const [toasts, setToasts] = useState<string[]>([
    "Your comment will reflect soon.",
    "You have a new follower.",
    "Your post has received over 100k likes.",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length > 0) {
        setToasts((prev) => prev.slice(1));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [toasts]);

  return (
    <div className={classes.toasts}>
      {toasts.map((toast, index) => (
        <Toast key={toast} message={toast} index={index} />
      ))}
    </div>
  );
};
