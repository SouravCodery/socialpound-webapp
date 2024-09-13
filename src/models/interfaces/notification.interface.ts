import { PostInterface } from "@/models/interfaces/post.interface";
import { SubDocumentUserInterface } from "./user.interface";

export interface NotificationInterface {
  _id: string;
  sender: SubDocumentUserInterface;
  type: string;
  post: {
    _id: string;
    content: PostInterface["content"][];
  };
  comment: string;
  read: boolean;
}

export interface NotificationResponseInterface {
  notifications: NotificationInterface[];
  nextCursor: string;
}
