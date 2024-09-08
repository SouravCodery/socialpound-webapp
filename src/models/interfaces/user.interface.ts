import { User } from "next-auth";

export interface LoginResponseInterface {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface SubDocumentUserInterface {
  username: string;
  profilePicture: string;
}

export interface UserDecodedTokenInterface extends User {
  iat: number;
  exp: number;
}

export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  fullName: string;

  profilePicture: string;
  bio: string;

  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface UserResponseInterface {
  user: UserInterface;
}
