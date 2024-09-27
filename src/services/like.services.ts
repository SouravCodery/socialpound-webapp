import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";
import { logger } from "@/logger/index.logger";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";

const userLikesFromLocalStorage = localStorageHelpers.getItem<string[]>({
  key: "post-likes",
});

let userLikesSet = userLikesFromLocalStorage
  ? new Set(userLikesFromLocalStorage)
  : null;

export const loadPostsLikedByUser = async () => {
  try {
    if (userLikesSet) {
      return;
    }

    const userLikesResponse = await apiSDKInstance.like.getPostsLikedByUser();
    const userLikes = userLikesResponse?.likes;

    localStorageHelpers.setItem({
      key: "post-likes",
      value: userLikes,
    });

    userLikesSet = new Set(userLikes);
  } catch (error) {
    logger.error("Error in isPostLikedByUser", error);
  }
};

export const isPostLikedByUser = ({ postId }: { postId: string }) => {
  try {
    return userLikesSet?.has(postId) ?? false;
  } catch (error) {
    logger.error("Error in isPostLikedByUser", error);
    return false;
  }
};

export const likeUserPost = async ({ postId }: { postId: string }) => {
  try {
    await apiSDKInstance.like.likePost({
      likeOn: "Post",
      post: postId,
    });

    if (userLikesSet) {
      userLikesSet.add(postId);
    }

    //todo: Remove it from here and Add this to window.addEventListener('beforeunload', ...)
    updateLikesToLocalStorage();
  } catch (error) {
    logger.error("Error in addLikeToPost", error);
  }
};

export const unlikeUserPost = async ({ postId }: { postId: string }) => {
  try {
    await apiSDKInstance.like.unlikePost({
      postId,
    });

    if (userLikesSet) {
      userLikesSet.delete(postId);
    }

    //todo: Remove it from here and Add this to window.addEventListener('beforeunload', ...)
    updateLikesToLocalStorage();
  } catch (error) {
    logger.error("Error in addLikeToPost", error);
  }
};

export const updateLikesToLocalStorage = () => {
  try {
    if (userLikesSet) {
      localStorageHelpers.setItem({
        key: "post-likes",
        value: Array.from(userLikesSet),
      });
    }
  } catch (error) {
    logger.error("Error in updateLikesToLocalStorage", error);
  }
};
