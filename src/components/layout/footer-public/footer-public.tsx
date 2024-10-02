import Link from "next/link";
import clsx from "clsx";
import classes from "./footer-public.module.css";

export const FooterPublic = () => (
  <footer className={classes.footer}>
    <Link className={clsx(classes.link)} href="/about-us">
      About Us
    </Link>
    <Link className={clsx(classes.link)} href="/terms-of-service">
      Terms of Service
    </Link>
    <Link className={clsx(classes.link)} href="/privacy-policy">
      Privacy Policy
    </Link>
  </footer>
);
