import Link from "next/link";
import clsx from "clsx";
import classes from "./info-page.module.css";

import { Logo } from "@/components/logo/logo";

export const InfoPage = ({
  title,
  content,
}: {
  title: string;
  content: string[];
}) => {
  return (
    <div className={clsx(classes.superContainer)}>
      <div className={clsx(classes.container, "shadow")}>
        <Link className={classes.header} href={"/"}>
          <Logo />
        </Link>
        <div className={clsx(classes.body)}>
          <h1 className={classes.title}>{title}</h1>
          {content.map((paragraph, index) => (
            <p key={index} className={classes.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
