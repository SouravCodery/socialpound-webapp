import { SubDocumentUserInterface } from "./user.interface";
interface ContentInterface {
  type: "image" | "video";
  url: string;
  aspectRatio: number;
}

export interface PostInterface {
  _id: string;
  user: SubDocumentUserInterface;
  content: ContentInterface[];
  caption: string;
  likesCount: number;
  commentsCount: number;
}

export interface PostResponseInterface {
  posts: PostInterface[];
  nextCursor: string;
}
