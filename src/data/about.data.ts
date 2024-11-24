export const sections = [
  {
    name: "Key Features",
    list: [
      {
        name: "Posts and Feed",
        description:
          "Share posts with image and caption, and enjoy a feed of posts from other users.",
      },
      {
        name: "Likes and Comments",
        description:
          "Don't forget to engage what you like! Like and Comment on posts to let others know your thoughts.",
      },
      {
        name: "Login via Google",
        description:
          "Why create a new account when you can log in with your Google account?",
      },
      {
        name: "Video/Audio Calling",
        description:
          "Connect with friends via video or audio calls, right from the platform.",
      },
      {
        name: "Notifications",
        description:
          "Stay updated with notifications for likes, comments, and friend requests.",
      },
      {
        name: "Friendship",
        description:
          "While posts are public currently, you need to be friends to call each other.",
      },
      {
        name: "Light/Dark Mode",
        description:
          "Whether you prefer light or dark mode, Socialpound has got you covered.",
      },
    ],
  },

  {
    name: "Technologies Used",
    list: [
      {
        name: "Frontend",
        description:
          "Built using Next.js App Router. SWR is used for efficient data fetching, and React Virtuoso enables smooth rendering of infinite list of Posts/Likes/Comments/Notifications by virtualizing the list. User authentication is handled via JWT (JSON Web Tokens) with Google OAuth for secure login. WebRTC and Socket.io are used for video/audio calling.",
      },
      {
        name: "Backend",
        description:
          "The backend API is developed using Node.js and Express.js, with MongoDB as the primary database. Redis is used for caching and managing persistent counters for likes and comments, while BullMQ handles job queues to process likes, comments, notifications in batches reducing the load on database. Media uploads are managed via AWS S3 using presigned URLs. Images being served via Cloudfront. User authentication is handled via JWT (JSON Web Tokens) with Google OAuth for secure login.",
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
  "This project is a work in progress, and new features will be added as it continues to evolve.",
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
      "Google OAuth",
      "Sharp",
      "HEIC2any",
      "Browser Image Compression",
      "WebRTC",
      "WebSocket (Socket.io)",
      "Sentry",
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
      "WebSocket (Socket.io)",
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
