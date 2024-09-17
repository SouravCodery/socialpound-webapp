import { useState } from "react";
import classes from "./delete-post.module.css";

import { BinIcon } from "@/components/icons/icons";
import { Modal } from "@/components/modal/modal";
import clsx from "clsx";

export const DeletePost = ({ isOwnPost }: { isOwnPost: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  if (!isOwnPost) return null;

  return (
    <>
      <button className={clsx(classes.deleteButton)} onClick={openModal}>
        <BinIcon />
      </button>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        title="Are you sure you want to delete post?"
        message="Your post may still be visible in some feeds for upto an hour once you delete it."
        confirmationButtonText="Delete post"
        processingText="Deleting post..."
        isProcessing={false}
      />
    </>
  );
};
