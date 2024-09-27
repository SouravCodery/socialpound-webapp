import { useState } from "react";
import clsx from "clsx";
import classes from "./delete-comment.module.css";

import { BinIcon } from "@/components/icons/icons";
import { Confirm } from "@/components/confirm/confirm";
import { useSWRDeleteCommentById } from "@/hooks/swr-hooks/comment.swr-hooks";

export const DeleteComment = ({
  isAuthorizedToDeleteComment,
  commentId,
  updateCommentsAfterDeletion,
}: {
  isAuthorizedToDeleteComment: boolean;
  commentId: string;
  updateCommentsAfterDeletion: ({ commentId }: { commentId: string }) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const { trigger, isMutating } = useSWRDeleteCommentById({ commentId });

  const deleteComment = async () => {
    try {
      if (isMutating) return;
      await trigger();
      updateCommentsAfterDeletion({ commentId });
    } catch (error) {
    } finally {
      closeModal();
    }
  };

  if (
    isAuthorizedToDeleteComment !== true ||
    commentId.startsWith("optimistic")
  )
    return null;

  return (
    <>
      <button className={clsx(classes.deleteButton)} onClick={openModal}>
        <BinIcon />
      </button>
      <Confirm
        title="Are you sure you want to delete this comment?"
        message="Your comment may still be visible in some feeds for upto an hour once you delete it."
        confirmationButtonText="Delete comment"
        processingText="Deleting comment..."
        isProcessing={isMutating}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={deleteComment}
      />
    </>
  );
};
