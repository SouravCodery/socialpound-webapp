# Socialpound Webapp

## Description

Socialpound Webapp is the frontend for Socialpound, a social media platform like Instagram. This web app is built using Next.js and focuses on features like post creation, comment interaction, likes, and more. It is designed to work with the Socialpound API.

This project is still a work in progress, and more features will be added in the future.

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
- [Contact](#contact)
- [Support](#support)

## Backend

The repository of Socialpound API made using Node.js, Express.js:  
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

## Features

- **Google OAuth**: Login via Google accounts
- **Post Management**: Create, delete, and retrieve posts
- **Likes System**: Like/unlike posts
- **Comment System**: Add and fetch comments on posts
- **Media Upload**: Compress and upload images using AWS presigned url
- **Responsive Design**: Designed for both mobile and desktop views
- **Light/Dark Mode**: Light/Dark Mode based on user's preference

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```bash
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_CDN_BASE_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
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

## Contact

For questions or feedback, feel free to reach out:

- **GitHub**: [github.com/SouravCodery](https://github.com/SouravCodery)
- **LinkedIn**: [linkedin.com/in/SouravCodery](https://www.linkedin.com/in/SouravCodery)
- **Email**: souravscchoudhary@gmail.com

## Support

If you find this project helpful or interesting, please give it a ⭐ on [GitHub](https://github.com/SouravCodery/socialpound-webapp)!
