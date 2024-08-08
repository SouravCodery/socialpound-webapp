export const API_ROUTES = {
  user: {
    signIn: "/v1/user/sign-in",
  },
  post: {
    createPost: "/v1/post",
    fetchPosts: "/v1/post",
  },
} as const;
