import { User } from "next-auth";

export interface LoginResponseInterface {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface CredentialsInterface {
  username: string;
  password: string;
}

export interface UserInterface {
  username: string;
  profilePicture: string;
}

export interface UserDecodedTokenInterface extends User {
  iat: number;
  exp: number;
}
