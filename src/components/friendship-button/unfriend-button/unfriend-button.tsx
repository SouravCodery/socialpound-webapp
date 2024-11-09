import { useState } from "react";

import { FriendshipStatus } from "@/models/interfaces/friendship.interface";
import { useSWRUnfriend } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { Confirm } from "../../confirm/confirm";

export const UnfriendButton = ({
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
  const { isMutating, trigger } = useSWRUnfriend({ userId });

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const unfriend = async () => {
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
        Unfriend
      </button>
      <Confirm
        title="Are you sure you want to unfriend?"
        message="You won't be able to call each other."
        confirmationButtonText="Unfriend"
        processingText="Unfriending..."
        isProcessing={isMutating}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={unfriend}
      />
    </>
  );
};
