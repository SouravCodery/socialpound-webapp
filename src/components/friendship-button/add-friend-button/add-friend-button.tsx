import { useState } from "react";

import { FriendshipStatus } from "@/models/interfaces/friendship.interface";
import { useSWRSendFriendRequest } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { Confirm } from "../../confirm/confirm";
import { logger } from "@/logger/index.logger";

export const AddFriendButton = ({
  className,
  userId,

  updateCurrentFriendShipStatus,
}: {
  className: string;
  userId: string;

  updateCurrentFriendShipStatus: ({
    updatedStatus,
  }: {
    updatedStatus: FriendshipStatus;
  }) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMutating, trigger } = useSWRSendFriendRequest();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const sendFriendRequest = async () => {
    try {
      if (isMutating) return;
      await trigger({ receiverId: userId });
      updateCurrentFriendShipStatus({ updatedStatus: "requested" });
    } catch (error) {
      logger.error("Error in sendFriendRequest", error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button className={className} onClick={openModal}>
        Add Friend
      </button>
      <Confirm
        title="Are you sure you want to send friend request?"
        message="Once your request is accepted, you will be able to call each other."
        confirmationButtonText="Add Friend"
        processingText="Sending Request..."
        isProcessing={isMutating}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={sendFriendRequest}
      />
    </>
  );
};
