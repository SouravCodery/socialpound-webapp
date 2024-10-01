import { InfoPage } from "@/components/info-page/info-page";

export const AboutUs = () => {
  return <InfoPage title="About Us" content={aboutContent} />;
};

const aboutContent = [
  "Welcome to Socialpound, a learning-driven social media platform developed for educational purposes. Socialpound is designed to mimic popular social media platforms like Instagram, allowing developers and enthusiasts to explore and practice modern web development and system design techniques in a real-world project scenario.",

  "Socialpound is built using the MERN stack (MongoDB, Express.js, React, and Node.js) with additional technologies like Redis, BullMQ, and AWS S3 to offer scalable, real-world functionality. This platform is a complete web application that implements features such as user authentication, post creation, likes, comments, and media uploads, all of which are backed by a robust backend API.",

  "### Stack Summary:",
  "- Frontend: Next.js, React.js, SWR, TypeScript, React Virtuoso, Mitt, JWT-decode, Sharp, HEIC2any, Browser Image Compression",
  "- Backend: Node.js, Express.js, MongoDB, Mongoose, Redis, BullMQ, AWS Presigned URL, TypeScript, JWT, Morgan, Winston, Joi, Google-auth-library, Compression",
  "- Cloud: AWS S3, AWS CloudFront, AWS EC2, AWS Elasticache, MongoDB Atlas, Vercel, Cloudflare",

  "### Key Features of Socialpound:",

  "- Google OAuth Authentication: Users can log in via their Google accounts using OAuth 2.0, ensuring secure and convenient access.",
  "- Post Management: Users can create, delete, and retrieve posts, allowing them to share content like images with captions.",
  "- Likes and Comments System: Users can like and comment on posts, creating a fully interactive social media experience.",
  "- Media Upload via AWS S3: Images are compressed and uploaded through presigned URLs to AWS S3, ensuring efficient media handling.",
  "- Responsive Design: Socialpound is designed for seamless experiences on both mobile and desktop devices, adapting its layout based on screen size.",
  "- Light/Dark Mode: Users can switch between light and dark themes according to their preferences.",

  "### Technologies Used:",

  "- Frontend: Built using Next.js for server-side rendering and React for the user interface. SWR is used for efficient data fetching, and React Virtuoso enables smooth rendering of infinite list of Posts/Likes/Comments by virtualizing the list. The platform also incorporates TypeScript for type-safe code and enhanced developer experience.",
  "- Backend: The backend API is developed using Node.js and Express.js, with MongoDB as the primary database. Redis is used for caching and managing persistent counters for likes and comments, while BullMQ handles job queues to process likes, comments, notifications in batches reducing the load on database. Media uploads are managed via AWS S3 using presigned URLs. Served via Cloudfront.",
  "- Security: User authentication is handled via JWT (JSON Web Tokens) with Google OAuth for secure login.",

  "This project is a work in progress, and new features will be added as it continues to evolve. Feel free to explore the project!",
  "Please note that Socialpound is created solely for educational purposes. It is not intended for commercial use, and the data you provide is used exclusively to enhance the learning experience.",
  "For any questions or feedback, please reach out at souravscchoudhary@gmail.com",
];
