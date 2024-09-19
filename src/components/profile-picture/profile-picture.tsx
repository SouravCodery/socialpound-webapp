"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import classes from "./profile-picture.module.css";
import { Constants } from "@/constants/constants";

export const ProfilePicture = ({
  scale,
  dpURL,
}: {
  scale?: "medium" | "large";
  dpURL: string;
}) => {
  const socialpoundUserProfilePicture = `${Constants.CDN_BASE_URL}/${Constants.SOCIAL_POUND_USER_DP}`;
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    dpURL || socialpoundUserProfilePicture
  );

  const handleErrorInMedia = () => {
    setProfilePictureUrl(socialpoundUserProfilePicture);
  };

  if (!profilePictureUrl) {
    return null;
  }

  return (
    <div className={clsx(classes.dpContainer, scale && classes[scale])}>
      <Image
        src={socialpoundUserProfilePicture || profilePictureUrl}
        alt="Profile Picture"
        fill
        sizes="60px"
        onError={handleErrorInMedia}
      />
    </div>
  );
};
