"use client";

import { useEffect, useRef, useState } from "react";

import { UserInterface } from "@/models/interfaces/user.interface";
import { SocketConstants } from "@/constants/socket.constants";

import { Modal } from "../modal/modal";
import { bakeToast } from "../toasts/toasts";
import { useSocket } from "@/context/socket.context";
import { useSWRCheckFriendshipStatus } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { EventAcknowledgementCallbackParam } from "@/models/interfaces/socket.interface";

export const Call = ({ user }: { user: UserInterface }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection>();

  const { data } = useSWRCheckFriendshipStatus({
    otherUserId: user._id,
  });

  const socket = useSocket();

  const callFriend = async () => {
    try {
      if (data?.status !== "accepted") {
        bakeToast({ type: "error", message: "You can only call friends." });
      }

      if (!socket || socket.connected === false) {
        bakeToast({
          type: "error",
          message: "Call couldn't be initiated, Refresh and Retry",
        });
        return;
      }

      setIsModalOpen(true);

      const stream = await openMediaDevices({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      peerConnectionRef.current = new RTCPeerConnection(configuration);
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      const { _id: friendId } = user;

      socket?.emit(
        SocketConstants.EVENTS.CALL_FRIEND,
        { friendId, offer },
        eventAcknowledgementCallback
      );
    } catch (error) {
      bakeToast({
        type: "error",
        message: "Call couldn't be initiated, Refresh and Retry",
      });
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketConstants.EVENTS.INCOMING_CALL, async (data) => {
      const { message, offer, roomId, callingUserId } = data;

      if (!offer) {
        return;
      }

      bakeToast({ type: "success", message });

      peerConnectionRef.current = new RTCPeerConnection(configuration);
      peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socket.emit(
        SocketConstants.EVENTS.CALL_ANSWER,
        {
          answer,

          friendId: callingUserId,
          roomId,
        },
        eventAcknowledgementCallback
      );
    });

    socket.on(SocketConstants.EVENTS.INCOMING_ANSWER, async (data) => {
      const { message, answer } = data;

      if (!answer || !peerConnectionRef.current) {
        return;
      }

      bakeToast({ type: "success", message });

      const remoteDesc = new RTCSessionDescription(answer);
      await peerConnectionRef.current.setRemoteDescription(remoteDesc);
    });

    socket.on(SocketConstants.EVENTS.CALL_FAILED, (data) => {
      const { message } = data;
      bakeToast({ type: "error", message });
    });

    socket.on(SocketConstants.EVENTS.CONNECTION_ERROR, (err) => {
      bakeToast({ type: "error", message: err.message });
    });

    return () => {
      socket.off(SocketConstants.EVENTS.INCOMING_CALL);
      socket.off(SocketConstants.EVENTS.CALL_FAILED);
      socket.off(SocketConstants.EVENTS.CONNECTION_ERROR);
    };
  }, [socket]);

  return (
    <>
      <button onClick={callFriend}>Call</button>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
        <div>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "300px" }}
          />
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "300px" }}
          />
        </div>
      </Modal>
    </>
  );
};

const openMediaDevices = async (constraints: MediaStreamConstraints) => {
  return await navigator.mediaDevices.getUserMedia(constraints);
};

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const eventAcknowledgementCallback = (
  response: EventAcknowledgementCallbackParam
) => {
  const { isSuccessful, message } = response;

  bakeToast({
    type: isSuccessful ? "success" : "error",
    message: message,
  });
};
