import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";
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

export const addLikeToUserLikesSet = async ({ postId }: { postId: string }) => {
  try {
    if (userLikesSet) {
      userLikesSet.add(postId);
    }
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
