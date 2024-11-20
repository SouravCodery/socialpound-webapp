import { useState } from "react";

import { FriendshipStatus } from "@/models/interfaces/friendship.interface";
import { useSWRRespondToFriendRequest } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { Confirm } from "@/components/confirm/confirm";

export const RejectFriendRequestButton = ({
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

  const rejectFriendRequest = async () => {
    try {
      if (isMutating) return;
      await trigger({ requesterId: userId, status: "rejected" });
      updateCurrentFriendShipStatus({ updatedStatus: "rejected" });
    } catch (error) {
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button className={className} onClick={openModal}>
        Reject Friend Request
      </button>
      <Confirm
        title="Are you sure you want to reject friend request?"
        message="You won't be able to call each other."
        confirmationButtonText="Reject Friend Request"
        processingText="Rejecting Friend Request..."
        isProcessing={isMutating}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={rejectFriendRequest}
      />
    </>
  );
};
