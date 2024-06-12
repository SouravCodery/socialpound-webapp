import clsx from "clsx";
import Image from "next/image";

import auth from "@/middleware";

import classes from "./profile-navigator-icon.module.css";

export const ProfileNavigatorIcon = async ({
  upScale = false,
}: {
  upScale?: Boolean;
}) => {
  const session = await auth();
  const dp = session?.user?.image;

  if (!dp) return null;

  return (
    <div className={clsx(classes.dpContainer, upScale && classes.upScale)}>
      <Image src={dp} alt="Profile Picture" fill sizes="60px" />
    </div>
  );
};
