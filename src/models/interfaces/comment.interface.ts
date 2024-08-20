import { UserInterface } from "./user.interface";

export interface CommentInterface {
  _id: string;

  commentOn: "Post" | "Comment";
  post: string;
  parentComment?: string;

  user: UserInterface;
  text: string;
}

export interface CommentResponseInterface {
  comments: CommentInterface[];
  cursor: string;
}
