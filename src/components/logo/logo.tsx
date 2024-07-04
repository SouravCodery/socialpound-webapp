import clsx from "clsx";
import { Cedarville_Cursive } from "next/font/google";

import classes from "./logo.module.css";

const cedarvilleCursive = Cedarville_Cursive({
  weight: ["400"],
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <div className={clsx(classes.logo, cedarvilleCursive.className)}>
      Socialpound
    </div>
  );
};
