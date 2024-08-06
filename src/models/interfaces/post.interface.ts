interface ContentInterface {
  type: "image" | "video";
  url: string;
}

export interface PostInterface {
  user: Object;
  content: ContentInterface[];
  caption: string;
  likesCount: number;
  commentsCount: number;
}
