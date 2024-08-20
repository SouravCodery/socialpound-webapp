import { UserInterface } from "./user.interface";
interface ContentInterface {
  type: "image" | "video";
  url: string;
}

export interface PostInterface {
  _id: string;
  user: UserInterface;
  content: ContentInterface[];
  caption: string;
  likesCount: number;
  commentsCount: number;
}
