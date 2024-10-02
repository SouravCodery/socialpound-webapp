import Link from "next/link";
import clsx from "clsx";
import classes from "./footer-public.module.css";

export const FooterPublic = () => (
  <footer className={classes.footer}>
    <Link className={clsx(classes.link)} href="/public/about-us">
      About Us
    </Link>
    <Link className={clsx(classes.link)} href="/public/terms-of-service">
      Terms of Service
    </Link>
    <Link className={clsx(classes.link)} href="/public/privacy-policy">
      Privacy Policy
    </Link>
    <a
      className={clsx(classes.link)}
      href={"https://souravchoudhary.com"}
      target="_blank"
      rel="noopener noreferrer"
    >
      Sourav Choudhary
    </a>
  </footer>
);
