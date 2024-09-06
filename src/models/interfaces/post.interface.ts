import { UserInterface } from "./user.interface";
interface ContentInterface {
  type: "image" | "video";
  url: string;
  aspectRatio: number;
}

export interface PostInterface {
  _id: string;
  user: UserInterface;
  content: ContentInterface[];
  caption: string;
  likesCount: number;
  commentsCount: number;
}

export interface PostResponseInterface {
  posts: PostInterface[];
  nextCursor: string;
}
