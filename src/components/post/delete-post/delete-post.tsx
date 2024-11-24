import { useState } from "react";
import clsx from "clsx";
import classes from "./delete-post.module.css";

import { BinIcon } from "@/components/icons/icons";
import { Confirm } from "@/components/confirm/confirm";
import { useSWRDeletePostById } from "@/hooks/swr-hooks/post.swr-hooks";
import { logger } from "@/logger/index.logger";

export const DeletePost = ({
  isOwnPost,
  postId,
  updatePostsAfterDeletion,
}: {
  isOwnPost: boolean;
  postId: string;
  updatePostsAfterDeletion: ({ postId }: { postId: string }) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const { trigger, isMutating } = useSWRDeletePostById({ postId });

  const deletePost = async () => {
    try {
      if (isMutating) return;
      await trigger();
      updatePostsAfterDeletion({ postId });
    } catch (error) {
      logger.error("Error in deletePost", error);
    } finally {
      closeModal();
    }
  };

  if (isOwnPost !== true) return null;

  return (
    <>
      <button className={clsx(classes.deleteButton)} onClick={openModal}>
        <BinIcon />
      </button>
      <Confirm
        title="Are you sure you want to delete post?"
        message="Your post may still be visible in some feeds for upto an hour once you delete it."
        confirmationButtonText="Delete post"
        processingText="Deleting post..."
        isProcessing={isMutating}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={deletePost}
      />
    </>
  );
};
