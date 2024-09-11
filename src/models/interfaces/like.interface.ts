import { SubDocumentUserInterface } from "./user.interface";

export interface LikeInterface {
  _id: string;

  likeOn: "Post" | "Comment";
  post: string;
  comment?: string;

  liker: SubDocumentUserInterface;
}

export interface LikeResponseInterface {
  likes: LikeInterface[];
  nextCursor: string;
}

export interface PostsLikedByUserResponseInterface {
  likes: string[];
}
