import clsx from "clsx";
import classes from "./profile.module.css";
import { LogoutButton } from "@/components/auth/auth";

export default function Profile() {
  return (
    <div className={clsx(classes.profile)}>
      <LogoutButton />
    </div>
  );
}
