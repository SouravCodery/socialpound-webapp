export const API_ROUTES = {
  user: {
    signIn: "/v1/user/sign-in",
    getUserByUsername: ({ username }: { username: string }) =>
      `/v1/user/${username}`,
    deleteUser: "/v1/user",
  },

  post: {
    createPost: "/v1/post",
    getUserFeed: "/v1/post",
    getPostsByUserId: ({ userId }: { userId: string }) => `/v1/post/${userId}`,
    deletePostById: ({ postId }: { postId: string }) => `/v1/post/${postId}`,
  },

  comment: {
    addComment: "/v1/comment",
    getCommentsByPostId: ({ postId }: { postId: string }) =>
      `/v1/comment/post/${postId}`,
    deleteCommentById: ({ commentId }: { commentId: string }) =>
      `/v1/comment/${commentId}`,
  },

  awsPresignedUrl: {
    getPresignedUrl: "/v1/aws-presigned-url",
  },

  like: {
    likePost: "/v1/like",
    getLikesByPostId: ({ postId }: { postId: string }) =>
      `/v1/like/post/${postId}`,
    getPostsLikedByUser: `/v1/like/post/user`,
    unlikePost: ({ postId }: { postId: string }) => `/v1/like/post/${postId}`,
  },

  notification: {
    getNotificationsByUser: "/v1/notification",
  },

  friendship: {
    sendFriendRequest: "/v1/friendship/request",
    respondToFriendRequest: "/v1/friendship/respond",
    getFriendsList: "/v1/friendship/list",
    getPendingFriendRequests: "/v1/friendship/requests",
    friendshipStatus: ({ otherUser }: { otherUser: string }) =>
      `/v1/friendship/status/${otherUser}`,
    cancelFriendRequest: ({ userId }: { userId: string }) =>
      `/v1/friendship/cancel-request/${userId}`,
    unfriend: ({ userId }: { userId: string }) =>
      `/v1/friendship/unfriend/${userId}`,
  },
} as const;
