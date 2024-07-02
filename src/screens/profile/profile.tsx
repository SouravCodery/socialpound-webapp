import clsx from "clsx";
import classes from "./profile.module.css";

import { LogoutButton } from "@/components/auth/auth";
import { ProfileHeader } from "./profile-header/profile-header";
import { ProfileMain } from "./profile-main/profile-main";

export const Profile = () => {
  return (
    <div className={clsx(classes.profile)}>
      <ProfileHeader />
      <ProfileMain />

      <LogoutButton />
    </div>
  );
};
