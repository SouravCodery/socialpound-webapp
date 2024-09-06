export const API_ROUTES = {
  user: {
    signIn: "/v1/user/sign-in",
  },
  post: {
    createPost: "/v1/post",
    getUserFeed: "/v1/post",
  },
  comment: {
    addComment: "/v1/comment",
    getCommentsByPostId: ({ postId }: { postId: string }) =>
      `/v1/comment/post/${postId}`,
  },
  awsPresignedUrl: {
    getPresignedUrl: "/v1/aws-presigned-url",
  },
} as const;
