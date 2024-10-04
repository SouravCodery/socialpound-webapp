"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./profile-post.module.css";
import { Constants } from "@/constants/constants";
import { PostInterface } from "@/models/interfaces/post.interface";
import clsx from "clsx";

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
    <Link
      href={href}
      className={clsx(classes.profilePost, "shadow")}
      prefetch={false}
    >
      {errorInMedia === false ? (
        <Image
          src={`${Constants.CDN_BASE_URL}/${post.content[0].url}`}
          alt="Post Image"
          className={classes.asset}
          onError={handleErrorInMedia}
          fill={true}
          priority={true}
          sizes="(max-width: 768px) 32vw, (min-width: 769px) calc(33vw - 5.3rem), (min-width: 1060px) 264px"
          unoptimized={true}
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
