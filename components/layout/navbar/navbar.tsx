import Link from "next/link";

import clsx from "clsx";
import classes from "./navbar.module.css";

import HomeIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import PostIcon from "@mui/icons-material/AddBoxOutlined";
import ReelsIcon from "@mui/icons-material/SlideshowOutlined";
import ProfileIcon from "@mui/icons-material/AccountCircleOutlined";

const routes = [
  { path: "/", name: "Home", icon: HomeIcon },
  { path: "/search", name: "Search", icon: SearchIcon },
  { path: "/post", name: "Post", icon: PostIcon },
  { path: "/reels", name: "Reels", icon: ReelsIcon },
  { path: "/profile", name: "Profile", icon: ProfileIcon },
];

export const Navbar = async () => {
  return (
    <nav className={clsx(classes.navbar, "shadow")}>
      {routes.map((route) => (
        <Link key={route.path} href={route.path}>
          <route.icon />
        </Link>
      ))}
    </nav>
  );
};
