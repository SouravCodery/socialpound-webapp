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
    getCommentsByPostId: ({
      postId,
      cursor,
    }: {
      postId: string;
      cursor?: string;
    }) => {
      let url = `/v1/comment/post/${postId}`;

      if (cursor) {
        url += `?cursor=${cursor}`;
      }

      return url;
    },
  },
  awsPresignedUrl: {
    getPresignedUrl: "/v1/aws-presigned-url",
  },
} as const;
