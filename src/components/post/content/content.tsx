import { useState } from "react";
import classes from "./content.module.css";

import { Constants } from "@/constants/constants";
import { PostInterface } from "@/models/interfaces/post.interface";

export const Content = ({
  post,
  isLiked,

  likePost,
}: {
  post: PostInterface;
  isLiked: boolean;

  likePost: () => Promise<void>;
}) => {
  const [errorInMedia, setErrorInMedia] = useState<boolean>(false);

  const handleErrorInMedia = () => {
    setErrorInMedia(true);
  };

  return (
    <div
      className={classes.content}
      style={{ aspectRatio: post.content[0].aspectRatio ?? 1 }}
      onDoubleClick={() => {
        if (isLiked === false) {
          likePost();
        }
      }}
    >
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
          <p>🚧 Oops! The picture took a detour. Maybe it’s shy? 😅 📦 📸</p>
          <p>⚡ There might be something wrong with the CDN 🛰️</p>
          <p>Try reloading, or imagine the coolest image ever here! 🖼️✨</p>
        </div>
      )}
    </div>
  );
};
