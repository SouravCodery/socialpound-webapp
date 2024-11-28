"use client";

import { Tweet } from "react-tweet";
import classes from "./embedded-tweet.module.css";
import clsx from "clsx";

export const EmbeddedTweet = ({
  tweetId,
  extraClasses,
}: {
  tweetId: string;
  extraClasses?: string;
}) => {
  return (
    <div className={clsx(classes.container, extraClasses && extraClasses)}>
      <Tweet id={tweetId} />
    </div>
  );
};
