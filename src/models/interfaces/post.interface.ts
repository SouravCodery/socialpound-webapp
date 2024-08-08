interface ContentInterface {
  type: "image" | "video";
  url: string;
}

interface UserInterface {
  username: string;
  profilePicture: string;
}

export interface PostInterface {
  _id: string;
  user: UserInterface;
  content: ContentInterface[];
  caption: string;
  likesCount: number;
  commentsCount: number;
}
