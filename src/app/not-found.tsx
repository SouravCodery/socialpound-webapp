import Link from "next/link";
import "./globals.css";
import classes from "./not-found.module.css";
import { Logo } from "@/components/logo/logo";

export default function NotFound() {
  return (
    <div className={classes.container}>
      <Link href="/" className={classes.logo}>
        <Logo />
      </Link>
      <h1 className={classes.title}>🐶 Oops, this page is lost in the void!</h1>
      <p className={classes.subtitle}>It seems like you’ve wandered off! 🐾</p>
      <p className={classes.subtitle}>
        Do not worry, our virtual doggo 🐕 is here to fetch you back!
      </p>
      <div className={classes.emoji}>🦮🦮🦮🦮🦮</div>
      <Link href="/" className={classes.link}>
        🏡 Take me back to safety!
      </Link>
    </div>
  );
}
