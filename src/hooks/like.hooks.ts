import { loadPostsLikedByUser } from "@/services/like.services";
import { useEffect, useState } from "react";

export const useLoadPostsLikedByUser = () => {
  const [isPostsLikedByUserLoading, setIsPostsLikedByUserLoading] =
    useState(true);

  useEffect(() => {
    (async () => {
      await loadPostsLikedByUser();
      setIsPostsLikedByUserLoading(false);
    })();
  }, []);

  return { isPostsLikedByUserLoading };
};
