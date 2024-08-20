import React from "react";
import classes from "./loader.module.css";

export const Loader = ({
  mode = "absolute",
  show,
  text,
}: {
  mode: "absolute" | "fixed";
  show: boolean;
  text?: string;
}) => {
  if (!show) return null;

  return (
    <div className={`${classes.backdrop} ${classes[mode]}`}>
      <div className={classes.spinner} />
      {text && <div className={classes.text}>{text}</div>}
    </div>
  );
};
