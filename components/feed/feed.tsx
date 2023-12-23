import clsx from "clsx";
import classes from "./feed.module.css";
import { Post } from "../post/post";

const posts = [
  {
    _id: 1,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1562222998-b3ad3853f657?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
  {
    _id: 2,
    dp: "https://images.unsplash.com/photo-1702336467664-18469b8f4ecf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D",
    images: [
      "https://images.unsplash.com/photo-1562222998-b3ad3853f657?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596481617623-d5abe119bd09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D",
    ],
    userName: "souravcodery",
    caption: "The Combination of One Up...",
  },
];

export default function Feed() {
  return (
    <div className={clsx(classes.feed)}>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
