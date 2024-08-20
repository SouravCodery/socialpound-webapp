export const API_ROUTES = {
  user: {
    signIn: "/v1/user/sign-in",
  },
  post: {
    createPost: "/v1/post",
    fetchPosts: "/v1/post",
  },
  comment: {
    addComment: "/v1/comment",
    getCommentsByPostId: ({ postId }: { postId: string }) =>
      `/v1/comment/post/${postId}`,
  },
} as const;
