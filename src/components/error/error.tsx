"use client";

import { useEffect } from "react";

import classes from "./error.module.css";
import { logger } from "@/logger/index.logger";

export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    logger.error("From Error Boundary", error);
  }, [error]);

  return (
    <div className={classes.errorContainer}>
      <h2 className={classes.errorTitle}>😢 Oops, Something went wrong!</h2>
      <p className={classes.errorMessage}>
        We’re facing a small hiccup 🚧. Don’t worry, we’re fixing it. Meanwhile,
        you can give it another go! 🎯
      </p>
      <button onClick={reset} className={classes.retryButton}>
        🔄 Try again
      </button>
      <div className={classes.errorEmoji}>🐧💻</div>
    </div>
  );
};
