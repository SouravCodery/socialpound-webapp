import { SubDocumentUserInterface } from "./user.interface";

export interface CommentInterface {
  _id: string;

  commentOn: "Post" | "Comment";
  post: string;
  parentComment?: string;

  user: SubDocumentUserInterface | null;
  postBy: string;
  text: string;
}

export interface CommentResponseInterface {
  comments: CommentInterface[];
  nextCursor: string;
}
