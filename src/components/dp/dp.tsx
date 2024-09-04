"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

import classes from "./dp.module.css";

export const DP = ({
  upScale = false,
  dpURL,
}: {
  upScale?: Boolean;
  dpURL: string;
}) => {
  const [errorInMedia, setErrorInMedia] = useState<boolean>(false);
  const [selectedEmoticon, setSelectedEmoticon] = useState("");

  const handleErrorInMedia = () => {
    const randomEmoticon =
      awesomeEmoticons[Math.floor(Math.random() * awesomeEmoticons.length)];

    setSelectedEmoticon(randomEmoticon);
    setErrorInMedia(true);
  };

  return (
    <div className={clsx(classes.dpContainer, upScale && classes.upScale)}>
      {errorInMedia === false ? (
        <Image
          src={dpURL}
          alt="Profile Picture"
          fill
          sizes="60px"
          onError={handleErrorInMedia}
        />
      ) : (
        <div
          className={classes.dpError}
          title="Oops! The profile picture didn't load."
        >
          {selectedEmoticon}
        </div>
      )}
    </div>
  );
};

const awesomeEmoticons = ["😄", "😃", "😀", "😊", "😉", "😍", "😜", "😎", "🤩"];
