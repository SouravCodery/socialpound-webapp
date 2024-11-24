import { useState } from "react";

import { FriendshipStatus } from "@/models/interfaces/friendship.interface";
import { useSWRRespondToFriendRequest } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { Confirm } from "@/components/confirm/confirm";
import { logger } from "@/logger/index.logger";

export const AcceptFriendRequestButton = ({
  className,
  userId,

  updateCurrentFriendShipStatus,
}: {
  className: string;
  userId: string;

  updateCurrentFriendShipStatus: ({
    updatedStatus,
  }: {
    updatedStatus?: FriendshipStatus;
  }) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMutating, trigger } = useSWRRespondToFriendRequest();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const acceptFriendRequest = async () => {
    try {
      if (isMutating) return;
      await trigger({ requesterId: userId, status: "accepted" });
      updateCurrentFriendShipStatus({ updatedStatus: "accepted" });
    } catch (error) {
      logger.error("Error in acceptFriendRequest", error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button className={className} onClick={openModal}>
        Accept Friend Request
      </button>
      <Confirm
        title="Are you sure you want to accept friend request?"
        message="You will be able to call each other."
        confirmationButtonText="Accept Friend Request"
        processingText="Accepting Friend Request..."
        isProcessing={isMutating}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={acceptFriendRequest}
      />
    </>
  );
};
