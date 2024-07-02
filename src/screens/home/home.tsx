import clsx from "clsx";
import classes from "./home.module.css";
import Feed from "@/components/feed/feed";

export const Home = () => {
  return (
    <div className={clsx(classes.homePage)}>
      <Feed />
    </div>
  );
};
