"use client";

import { useState } from "react";
import classes from "./profile-post.module.css";

import { PostInterface } from "@/models/interfaces/post.interface";
import { Constants } from "@/constants/constants";

export const ProfilePost = ({ post }: { post: PostInterface }) => {
  const [errorInMedia, setErrorInMedia] = useState<boolean>(false);

  const handleErrorInMedia = () => {
    setErrorInMedia(true);
  };

  return (
    <div className={classes.profilePost}>
      {errorInMedia === false ? (
        <img
          src={`${Constants.CDN_BASE_URL}/${post.content[0].url}`}
          alt="Post Image"
          className={classes.asset}
          onError={handleErrorInMedia}
          loading="lazy"
        />
      ) : (
        <div className={classes.mediaError}>
          <p>🚧 Oops! The picture took a detour.</p>
          <p>Maybe it’s shy? 😅 📦 📸</p>
        </div>
      )}
    </div>
  );
};
