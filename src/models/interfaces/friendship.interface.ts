import { SubDocumentUserInterface } from "./user.interface";

export type FriendshipStatus = "requested" | "accepted" | "rejected";

export interface FriendshipInterface {
  _id?: string;
  requester?: string;
  receiver?: string;
  status?: FriendshipStatus;
}

export interface FriendshipRequestsInterface {
  _id?: string;
  requester?: SubDocumentUserInterface;
  receiver?: SubDocumentUserInterface;
  status?: FriendshipStatus;
}

export interface FriendshipResponseInterface {
  friendships: FriendshipInterface[];
  nextCursor: string;
}
