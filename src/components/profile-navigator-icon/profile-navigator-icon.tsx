import Image from "next/image";

import auth from "@/middleware";

import classes from "./profile-navigator-icon.module.css";

export const ProfileNavigatorIcon = async () => {
  const session = await auth();
  const dp = session?.user?.image;

  if (!dp) return null;

  return (
    <div className={classes.dpContainer}>
      <Image src={dp} alt="Profile Picture" fill sizes="60px" />
    </div>
  );
};
