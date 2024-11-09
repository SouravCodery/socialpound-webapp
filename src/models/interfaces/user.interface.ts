export interface UserTokenPayloadInterface {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  profilePicture: string;
}

export interface LoginResponseInterface {
  token: string;
  user: UserTokenPayloadInterface;
}

export interface SubDocumentUserInterface {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  profilePicture: string;
}

export interface UserDecodedTokenInterface extends UserTokenPayloadInterface {
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
  friendsCount: number;
}

export interface UserResponseInterface {
  user: UserInterface;
}
