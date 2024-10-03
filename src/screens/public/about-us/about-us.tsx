import Link from "next/link";
import clsx from "clsx";
import classes from "./about-us.module.css";

import { sections, paras } from "@/data/about.data";
import { GitHubIcon, WebsiteIcon } from "@/components/icons/icons";
import { Logo } from "@/components/logo/logo";
import { Stack } from "./stack/stack";

export const AboutUs = () => {
  return (
    <div className={classes.superContainer}>
      <div className={classes.container}>
        <Link className={classes.header} href={"/"}>
          <Logo />
        </Link>
        <div className={classes.main}>
          <h1 className={classes.title}>About Us</h1>
          <p className={classes.para}>
            Welcome to Socialpound, a learning-driven social media platform
            developed for educational purposes. Socialpound is designed to mimic
            popular social media platforms like Instagram, allowing developers
            and enthusiasts to explore and practice modern web development and
            system design techniques in a real-world project scenario.
          </p>
          <p className={classes.para}>
            Socialpound is built using the MERN stack (MongoDB, Express.js,
            React, and Node.js) with additional technologies like Redis, BullMQ,
            and AWS S3 to offer scalable, real-world functionality. This
            platform is a complete web application that implements features such
            as user authentication, post creation, likes, comments, and media
            uploads, all of which are backed by a robust backend API.
          </p>
          <section className={classes.sectionContainer}>
            <h2 className={classes.sectionTitle}>Author</h2>
            <p className={classes.sectionMain}>
              <a
                href="https://souravchoudhary.com"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(classes.subTitle, classes.repo)}
              >
                <WebsiteIcon /> &nbsp; Sourav Choudhary (@SouravCodery)
              </a>
            </p>
          </section>
          <section className={classes.sectionContainer}>
            <h2 className={classes.sectionTitle}>Repository</h2>
            <p className={clsx(classes.sectionMain, classes.repositories)}>
              <a
                href="https://github.com/SouravCodery/socialpound-webapp"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(classes.subTitle, classes.repo)}
              >
                <GitHubIcon />
                &nbsp; Frontend
              </a>

              <a
                href="https://github.com/SouravCodery/socialpound-api"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(classes.subTitle, classes.repo)}
              >
                <GitHubIcon />
                &nbsp; Backend
              </a>
            </p>
          </section>
          <section className={classes.sectionContainer}>
            <h2 className={classes.sectionTitle}>Stack Summary</h2>
            <Stack />
          </section>
          {sections.map(({ name, list }) => (
            <section key={name} className={classes.sectionContainer}>
              <h2 className={classes.sectionTitle}>{name}</h2>
              <div className={classes.sectionMain}>
                {list.map(({ name, description }) => (
                  <div className={classes.sectionSub} key={name}>
                    <span className={classes.subTitle}>{name}</span>
                    <p className={classes.para}>{description}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
          {paras.map((para, index) => (
            <p key={index} className={classes.sectionMain}>
              {para}
            </p>
          ))}
          <p className={classes.sectionMain} style={{ display: "block" }}>
            For any questions or feedback, please reach out at&nbsp;
            <a
              href="mailto:souravscchoudhary@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              souravscchoudhary@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
