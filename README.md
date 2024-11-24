# Socialpound Webapp

<div style="text-align: center;">
   <img src="./public/socialpound-preview.gif" width="350" style="margin:auto;" alt="Socialpound Webapp Preview">
</div>

## Description

Socialpound Webapp is the frontend for Socialpound, a learning-driven social media platform built for fun and experimentation. This Web App is written in Next.js and allows users to share posts, engage with likes and comments, and connect with friends via Video/Audio calls. It’s designed to work seamlessly with the Socialpound API to offer a modern, scalable social media experience.

This project is a continuous work in progress and will evolve as new technologies and features are implemented.

This repository has been kept public as a small token of gratitude towards the open-source community. From React.js to Node.js, my entire current tech stack is built on open source, without which I wouldn’t have become a developer. It also serves to showcase a small glimpse of my Software Engineering skills and expertise in Full Stack Development.

## Table of Contents

- [Description](#description)
- [Backend](#backend)
- [Technologies](#technologies)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Learn More](#learn-more)
- [License](#license)
- [Note](#note)
- [Contact](#contact)
- [Support](#support)

## Backend

The repository for the Socialpound API, built using Node.js and Express.js.:  
[socialpound-api](https://github.com/SouravCodery/socialpound-api)

## Technologies

- **Next.js**: React framework for server-rendered apps
- **React**: JavaScript library for building user interfaces
- **SWR**: Data fetching library for remote data fetching
- **React Virtuoso**: Rendering large datasets with virtualization
- **Mitt**: Event emitter for toasts
- **JWT-decode**: Decodes JWT tokens
- **Sharp**: Image processing
- **HEIC2any**: Converts HEIC images to other formats
- **Browser Image Compression**: Client-side image compression
- **@react-oauth/google**: Google OAuth for user authentication
- **TypeScript**: Type-safe JavaScript superset
- **WebRTC and WebSocket (Socket.IO)**: For Video/Audio Calls
- **Sentry**: Error monitoring

## Features

- **Posts and Feed**: Create posts with images and captions, and view a personalized feed.
- **Likes and Comments**: Like and comment on posts to engage with others.
- **Login via Google**: Log in securely with your Google account.
- **Video/Audio Calling**: Connect with friends through WebRTC-powered video and audio calls.
- **Notifications**: Stay updated with real-time notifications for likes, comments, and friend requests.
- **Friendship System**: Make friends and reach out to them via Video/Audio calls.
- **Media Upload**: Compress and upload images to AWS S3 using presigned URLs.
- **Responsive Design**: Enjoy a seamless experience on both mobile and desktop devices.
- **Light/Dark Mode**: Switch between light and dark themes based on your preference.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```bash
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_CDN_BASE_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
SENTRY_AUTH_TOKEN=
```

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/SouravCodery/socialpound-webapp.git
cd socialpound-webapp
npm install
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the web app in action.

<!--
## Docker Setup

To make the setup easier, this project can also be run using Docker.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SouravCodery/socialpound-webapp.git
   cd socialpound-webapp
   ```

2. **Build the Docker image**:

   ```bash
   docker build -t socialpound-webapp .
   ```

3. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 socialpound-webapp
   ``` -->

You can then access the app at [http://localhost:3000](http://localhost:3000).

## Scripts

In the `package.json`, you have the following useful scripts:

- `npm run dev`: Starts the development server
- `npm run build`: Builds the production version of the app
- `npm run start`: Starts the production server
- `npm run lint`: Runs ESLint for code quality checks

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

## License

This project is for learning purposes and is not licensed for commercial use or redistribution. Feel free to explore the code for educational reasons.

## Note

WebRTC-based calls on this platform rely on peer-to-peer connections. If either device is behind a strict firewall or a network with restricted NAT settings, the call may fail to connect. In such cases, additional network configurations or a TURN server are required. A TURN server is not currently implemented on this platform. In most cases, switching one device to mobile data resolves the issue.

## Contact

For questions or feedback, feel free to reach out:

- **GitHub**: [github.com/SouravCodery](https://github.com/SouravCodery)
- **LinkedIn**: [linkedin.com/in/SouravCodery](https://www.linkedin.com/in/SouravCodery)
- **X**: [x.com/souravcodery](https://x.com/souravcodery)
- **Email**: souravscchoudhary@gmail.com

## Support

If you find this project helpful or interesting, please give it a ⭐ on [GitHub](https://github.com/SouravCodery/socialpound-webapp)!
