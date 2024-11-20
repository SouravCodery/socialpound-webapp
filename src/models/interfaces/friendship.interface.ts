import { SubDocumentUserInterface } from "./user.interface";

export type FriendshipStatus = "requested" | "accepted" | "rejected";

export interface FriendshipInterface {
  _id?: string;
  requester?: string;
  receiver?: string;
  status?: FriendshipStatus;
}

export interface FriendshipResponseInterface {
  friends: SubDocumentUserInterface[];
  nextCursor: string;
}

export interface PendingFriendshipRequest {
  _id: string;
  requester: SubDocumentUserInterface;
  receiver: string;
  status: FriendshipStatus;
}
export interface PendingFriendshipRequestsInterface {
  requests: PendingFriendshipRequest[];
  nextCursor: string;
}
