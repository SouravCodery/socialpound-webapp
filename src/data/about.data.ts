export const sections = [
  {
    name: "Key Features",
    list: [
      {
        name: "Google OAuth Authentication",
        description:
          "Users can log in via their Google accounts using OAuth 2.0, ensuring secure and convenient access.",
      },
      {
        name: "Post Management",
        description:
          "Users can create, delete, and retrieve posts, allowing them to share content like images with captions.",
      },
      {
        name: "Likes and Comments System",
        description:
          "Users can like and comment on posts, creating a fully interactive social media experience.",
      },
      {
        name: "Media Upload via AWS S3",
        description:
          "Images are compressed and uploaded through presigned URLs to AWS S3, ensuring efficient media handling.",
      },
      {
        name: "Responsive Design",
        description:
          "Socialpound is designed for seamless experiences on both mobile and desktop devices, adapting its layout based on screen size.",
      },
      {
        name: "Light/Dark Mode",
        description:
          "Users can switch between light and dark themes according to their preferences.",
      },
    ],
  },

  {
    name: "Technologies Used",
    list: [
      {
        name: "Frontend",
        description:
          "Built using Next.js App Router. SWR is used for efficient data fetching, and React Virtuoso enables smooth rendering of infinite list of Posts/Likes/Comments by virtualizing the list. The platform also incorporates TypeScript for type-safe code and enhanced developer experience.",
      },
      {
        name: "Backend",
        description:
          "The backend API is developed using Node.js and Express.js, with MongoDB as the primary database. Redis is used for caching and managing persistent counters for likes and comments, while BullMQ handles job queues to process likes, comments, notifications in batches reducing the load on database. Media uploads are managed via AWS S3 using presigned URLs. Served via Cloudfront. User authentication is handled via JWT (JSON Web Tokens) with Google OAuth for secure login.",
      },
      {
        name: "Cloud",
        description:
          "The backend server and redis cache is deployed on AWS EC2 using docker compose. MongoDB Atlas is used for the database. AWS Elastic Cache has been used for Redis key-value store. AWS S3 is used for media storage. Which is being served via Cloudfront. The frontend is deployed on Vercel.",
      },
    ],
  },
];

export const paras = [
  "This project is a work in progress, and new features will be added as it continues to evolve. Feel free to explore the project!",
  "Please note that Socialpound is created solely for educational purposes. It is not intended for commercial use, and the data you provide is used exclusively to enhance the learning experience.",
];

export const stack = [
  {
    title: "Frontend",
    list: [
      "Next.js",
      "React.js",
      "SWR",
      "TypeScript",
      "React Virtuoso",
      "Mitt",
      "JWT-decode",
      "Sharp",
      "HEIC2any",
      "Browser Image Compression",
    ],
  },
  {
    title: "Backend",
    list: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Redis",
      "BullMQ",
      "AWS Presigned URL",
      "TypeScript",
      "JWT",
      "Morgan",
      "Winston",
      "Joi",
      "Google-auth-library",
      "Compression",
    ],
  },
  {
    title: "Cloud",
    list: [
      "AWS S3",
      "AWS CloudFront",
      "AWS EC2",
      "AWS Elasticache",
      "MongoDB Atlas",
      "Vercel",
      "Cloudflare",
    ],
  },
];
