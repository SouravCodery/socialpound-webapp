"use client";

import { useState } from "react";
import classes from "./profile-post.module.css";

import { PostInterface } from "@/models/interfaces/post.interface";
import { Constants } from "@/constants/constants";
import Link from "next/link";

export const ProfilePost = ({
  post,
  userId,
}: {
  post: PostInterface;
  userId: string;
}) => {
  const [errorInMedia, setErrorInMedia] = useState<boolean>(false);
  const href = `/posts/${userId}`;

  const handleErrorInMedia = () => {
    setErrorInMedia(true);
  };

  return (
    <Link href={href} className={classes.profilePost} prefetch={false}>
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
    </Link>
  );
};
