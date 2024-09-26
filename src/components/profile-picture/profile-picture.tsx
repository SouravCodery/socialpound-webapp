"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import classes from "./profile-picture.module.css";
import { Constants } from "@/constants/constants";

const socialpoundUserProfilePicture = `${Constants.CDN_BASE_URL}/${Constants.SOCIAL_POUND_USER_DP}`;

const scaleMap = {
  extraSmall: "1.5rem",
  small: "2rem",
  medium: "2.75rem",
  large: "8rem",
};

export const ProfilePicture = ({
  scale = "extraSmall",
  dpURL,
}: {
  scale?: "extraSmall" | "small" | "medium" | "large";
  dpURL: string;
}) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    dpURL || socialpoundUserProfilePicture
  );

  useEffect(() => {
    setProfilePictureUrl(dpURL || socialpoundUserProfilePicture);
  }, [dpURL]);

  const handleErrorInMedia = () => {
    setProfilePictureUrl(socialpoundUserProfilePicture);
  };

  if (!profilePictureUrl) {
    return null;
  }

  return (
    <div className={clsx(classes.dpContainer, scale && classes[scale])}>
      <Image
        src={profilePictureUrl}
        alt="Profile Picture"
        fill
        sizes={scaleMap[scale]}
        onError={handleErrorInMedia}
        unoptimized
      />
    </div>
  );
};
