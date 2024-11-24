"use client";

import { useEffect, useState } from "react";
import classes from "./call-duration.module.css";

import { formatDuration } from "@/helpers/misc.helpers";

export const CallDuration = () => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div className={classes.duration}>{formatDuration({ duration })}</div>;
};
