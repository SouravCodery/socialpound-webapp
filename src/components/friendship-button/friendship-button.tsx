import { FriendshipStatus } from "@/models/interfaces/friendship.interface";
import { useSWRCheckFriendshipStatus } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { AddFriendButton } from "./add-friend-button/add-friend-button";

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
    updatedStatus: FriendshipStatus;
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

  if (isLoading || error) {
    return null;
  }

  if (friendshipStatus === null) {
    return (
      <AddFriendButton
        className={className}
        userId={userId}
        updateCurrentFriendShipStatus={updateCurrentFriendShipStatus}
      />
    );
  }

  return <button className={className}> Friends</button>;
};
