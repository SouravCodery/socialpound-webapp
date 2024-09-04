"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";

import classes from "./profile-picture.module.css";

export const ProfilePicture = ({
  upScale = false,
  dpURL,
  randomizeDP = false,
}: {
  upScale?: Boolean;
  dpURL: string;
  randomizeDP?: boolean;
}) => {
  const [errorInMedia, setErrorInMedia] = useState<boolean>(false);
  const [selectedEmoticon, setSelectedEmoticon] = useState(awesomeEmoticons[1]);

  const handleErrorInMedia = () => {
    setErrorInMedia(true);
  };

  useEffect(() => {
    if (randomizeDP) {
      setSelectedEmoticon(getRandomEmoticon());
    }
  }, []);

  return (
    <div className={clsx(classes.dpContainer, upScale && classes.upScale)}>
      {dpURL && errorInMedia === false ? (
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
const getRandomEmoticon = () =>
  awesomeEmoticons[Math.floor(Math.random() * awesomeEmoticons.length)];
