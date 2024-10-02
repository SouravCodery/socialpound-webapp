import Link from "next/link";
import classes from "./about-us.module.css";
import { Logo } from "@/components/logo/logo";
import { Stack } from "./stack/stack";
import { sections, paras } from "@/data/about.data";

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
            <h2 className={classes.sectionTitle}>Stack Summary</h2>
            <Stack />
          </section>
          {sections.map(({ name, list }) => (
            <section className={classes.sectionContainer}>
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
          <p className={classes.sectionMain}>
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
