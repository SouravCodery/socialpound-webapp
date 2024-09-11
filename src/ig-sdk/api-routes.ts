export const API_ROUTES = {
  user: {
    signIn: "/v1/user/sign-in",
    getUserByUsername: ({ username }: { username: string }) =>
      `/v1/user/${username}`,
  },
  post: {
    createPost: "/v1/post",
    getUserFeed: "/v1/post",
    getPostsByUserId: ({ userId }: { userId: string }) => `/v1/post/${userId}`,
  },
  comment: {
    addComment: "/v1/comment",
    getCommentsByPostId: ({ postId }: { postId: string }) =>
      `/v1/comment/post/${postId}`,
  },
  awsPresignedUrl: {
    getPresignedUrl: "/v1/aws-presigned-url",
  },
  like: {
    likePost: "/v1/like",
    getLikesByPostId: ({ postId }: { postId: string }) =>
      `/v1/like/post/${postId}`,
  },
} as const;
