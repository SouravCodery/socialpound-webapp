import { useState } from "react";

import { FriendshipStatus } from "@/models/interfaces/friendship.interface";
import { useSWRCancelFriendRequest } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { Confirm } from "../../confirm/confirm";

export const CancelFriendRequestButton = ({
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
  const { isMutating, trigger } = useSWRCancelFriendRequest({ userId });

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const cancelFriendRequest = async () => {
    try {
      if (isMutating) return;
      await trigger();
      updateCurrentFriendShipStatus({ updatedStatus: undefined });
    } catch (error) {
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <button className={className} onClick={openModal}>
        Cancel Friend Request
      </button>
      <Confirm
        title="Are you sure you want to cancel friend request?"
        message="Your friend request will be cancelled."
        confirmationButtonText="Cancel Friend Request"
        processingText="Cancelling Request..."
        isProcessing={isMutating}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={cancelFriendRequest}
      />
    </>
  );
};
