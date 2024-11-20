import { FriendshipStatus } from "@/models/interfaces/friendship.interface";
import { useSWRCheckFriendshipStatus } from "@/hooks/swr-hooks/friendship.swr-hooks";

import { AddFriendButton } from "./add-friend-button/add-friend-button";
import { CancelFriendRequestButton } from "./cancel-friend-request-button/cancel-friend-request-button";
import { AcceptFriendRequestButton } from "./accept-friend-request-button/accept-friend-request-button";
import { RejectFriendRequestButton } from "./reject-friend-request-button/reject-friend-request-button";
import { UnfriendButton } from "./unfriend-button/unfriend-button";

export const FriendshipButton = ({
  className,
  userId,
}: {
  className: string;
  userId: string;
}) => {
  const { data, error, isLoading, updateFriendshipStatus } =
    useSWRCheckFriendshipStatus({
      otherUserId: userId,
    });

  const updateCurrentFriendShipStatus = ({
    updatedStatus,
  }: {
    updatedStatus?: FriendshipStatus;
  }) => {
    updateFriendshipStatus(
      async (prev) => {
        if (prev) return { ...prev, status: updatedStatus };

        return {
          status: updatedStatus,
        };
      },
      { revalidate: false }
    );
  };

  const friendshipStatus = data?.status ?? null;
  const { requester } = data ?? {};

  if (isLoading || error) {
    return null;
  }

  if (friendshipStatus === "requested") {
    if (requester === userId)
      return (
        <>
          <AcceptFriendRequestButton
            className={className}
            userId={userId}
            updateCurrentFriendShipStatus={updateCurrentFriendShipStatus}
          />
          <RejectFriendRequestButton
            className={className}
            userId={userId}
            updateCurrentFriendShipStatus={updateCurrentFriendShipStatus}
          />
        </>
      );

    return (
      <CancelFriendRequestButton
        className={className}
        userId={userId}
        updateCurrentFriendShipStatus={updateCurrentFriendShipStatus}
      />
    );
  }

  if (friendshipStatus === "accepted") {
    return (
      <UnfriendButton
        className={className}
        userId={userId}
        updateCurrentFriendShipStatus={updateCurrentFriendShipStatus}
      />
    );
  }

  return (
    <AddFriendButton
      className={className}
      userId={userId}
      updateCurrentFriendShipStatus={updateCurrentFriendShipStatus}
    />
  );
};
