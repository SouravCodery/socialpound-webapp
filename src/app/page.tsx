import clsx from "clsx";
import classes from "./page.module.css";
import Feed from "../../components/feed/feed";

export default function HomePage() {
  return (
    <div className={clsx(classes.main)}>
      <Feed />
    </div>
  );
}
