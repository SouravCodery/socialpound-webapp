"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import classes from "./profile-picture.module.css";
import { Constants } from "@/constants/constants";

const socialpoundUserProfilePicture = `${Constants.CDN_BASE_URL}/${Constants.SOCIAL_POUND_USER_DP}`;

export const ProfilePicture = ({
  scale,
  dpURL,
}: {
  scale?: "medium" | "large";
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

  const sizes = !scale ? "3rem" : scale === "medium" ? "3rem" : "8rem";

  return (
    <div className={clsx(classes.dpContainer, scale && classes[scale])}>
      <Image
        src={profilePictureUrl}
        alt="Profile Picture"
        fill
        sizes={sizes}
        onError={handleErrorInMedia}
        unoptimized
      />
    </div>
  );
};
