import classes from "./profile-posts.module.css";
import { ProfilePost } from "./profile-post/profile-post";

const posts = [
  {
    _id: 8,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1655393358928-27e7b26463fa?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
  {
    _id: 1,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1562222998-b3ad3853f657?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },

  {
    _id: 2,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1718967917204-b359a7b6a742?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
  {
    _id: 3,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
  {
    _id: 4,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1718641731724-0b583a50df1f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
  {
    _id: 5,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1718662514694-e7cbb05d631d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
  {
    _id: 6,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1718869582016-dc95d38ad399?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
  {
    _id: 7,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1718703358140-20d926a089e0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
];

export const ProfilePosts = () => {
  return (
    <div className={classes.postsGrid}>
      {posts.map((post) => (
        <ProfilePost key={post._id} post={post} />
      ))}
    </div>
  );
};
