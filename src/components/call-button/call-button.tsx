"use client";

import { useCall } from "@/context/call.context";
import { useSWRCheckFriendshipStatus } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { SubDocumentUserInterface } from "@/models/interfaces/user.interface";
import { bakeToast } from "../toasts/toasts";

export const CallButton = ({ user }: { user: SubDocumentUserInterface }) => {
  const { startCall } = useCall();

  const { data: friendshipStatusData } = useSWRCheckFriendshipStatus({
    otherUserId: user._id,
  });

  const isFriend = friendshipStatusData?.status === "accepted";

  const callHandler = () => {
    if (isFriend === false) {
      bakeToast({ type: "error", message: "You can only call friends." });
      return;
    }

    startCall({ user });
  };

  return (
    <div>
      <button onClick={callHandler}>Call</button>
    </div>
  );
};
