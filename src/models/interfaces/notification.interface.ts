import { PostInterface } from "@/models/interfaces/post.interface";
import { SubDocumentUserInterface } from "./user.interface";

type NotificationTypes =
  | "like-on-post"
  | "like-on-comment"
  | "comment"
  | "reply"
  | "add-friend";

export interface NotificationInterface {
  _id: string;
  sender: SubDocumentUserInterface;
  type: NotificationTypes;
  post: {
    _id: string;
    content: PostInterface["content"];
  };
  comment?: {
    _id: string;
    text: string;
  };
  read: boolean;
}

export interface NotificationResponseInterface {
  notifications: NotificationInterface[];
  nextCursor: string;
}
