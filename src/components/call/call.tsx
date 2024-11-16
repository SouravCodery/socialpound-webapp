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

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection>();
  const roomIdRef = useRef<string>();
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const { data } = useSWRCheckFriendshipStatus({
    otherUserId: user._id,
  });

  const socket = useSocket();

  const eventAcknowledgementCallback = (
    response: EventAcknowledgementCallbackParam
  ) => {
    const { isSuccessful, message, roomId } = response;

    if (isSuccessful && roomId) {
      roomIdRef.current = roomId;
    }

    bakeToast({
      type: isSuccessful ? "success" : "error",
      message: message,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = undefined;
    }

    if (localVideoRef.current && localVideoRef.current.srcObject) {
      (localVideoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      (remoteVideoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
  };

  const setupLocalMedia = async (): Promise<MediaStream> => {
    const stream = await openMediaDevices({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    return stream;
  };

  const createPeerConnection = (
    stream: MediaStream,
    roomId: string | undefined
  ): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection(configuration);

    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    peerConnection.addEventListener("icecandidate", (event) => {
      const candidate = event.candidate;
      if (candidate && socket) {
        socket.emit(SocketConstants.EVENTS.NEW_ICE_CANDIDATE_SENT, {
          candidate,
          roomId,
        });
      }
    });

    peerConnection.addEventListener("track", async (event) => {
      const [remoteStream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    return peerConnection;
  };

  // Helper function to process pending ICE candidates
  const processPendingCandidates = async () => {
    if (pendingCandidatesRef.current.length > 0 && peerConnectionRef.current) {
      for (const candidate of pendingCandidatesRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
        } catch (err) {
          console.error("Error adding buffered ice candidate", err);
        }
      }
      pendingCandidatesRef.current = [];
    }
  };

  const callFriend = async () => {
    try {
      if (data?.status !== "accepted") {
        bakeToast({ type: "error", message: "You can only call friends." });
        return;
      }

      if (!socket || socket.connected === false) {
        bakeToast({
          type: "error",
          message: "Call couldn't be initiated, Refresh and Retry",
        });
        return;
      }

      setIsModalOpen(true);

      const stream = await setupLocalMedia();

      peerConnectionRef.current = createPeerConnection(
        stream,
        roomIdRef.current
      );

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      const { _id: friendId } = user;

      socket.emit(
        SocketConstants.EVENTS.CALL_FRIEND,
        { friendId, offer },
        (response: EventAcknowledgementCallbackParam) => {
          eventAcknowledgementCallback(response);
          if (response.isSuccessful && response.roomId) {
            roomIdRef.current = response.roomId;
          }
        }
      );
    } catch (error) {
      console.error("Error initiating call:", error);
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

      setIsModalOpen(true);

      const stream = await setupLocalMedia();

      peerConnectionRef.current = createPeerConnection(stream, roomId);

      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      await processPendingCandidates();

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

      roomIdRef.current = roomId;
    });

    socket.on(SocketConstants.EVENTS.INCOMING_ANSWER, async (data) => {
      const { message, answer, roomId } = data;

      if (!answer || !peerConnectionRef.current) {
        return;
      }

      bakeToast({ type: "success", message });

      const remoteDesc = new RTCSessionDescription(answer);
      await peerConnectionRef.current.setRemoteDescription(remoteDesc);

      await processPendingCandidates();

      roomIdRef.current = roomId;
    });

    socket.on(
      SocketConstants.EVENTS.NEW_ICE_CANDIDATE_RECEIVED,
      async (data) => {
        const { candidate } = data;

        if (!peerConnectionRef.current || !candidate) return;

        if (peerConnectionRef.current.remoteDescription) {
          try {
            await peerConnectionRef.current.addIceCandidate(candidate);
          } catch (err) {
            console.error("Error adding received ice candidate", err);
          }
        } else {
          pendingCandidatesRef.current.push(candidate);
        }
      }
    );

    socket.on(SocketConstants.EVENTS.CALL_FAILED, (data) => {
      const { message } = data;
      bakeToast({ type: "error", message });
    });

    socket.on(SocketConstants.EVENTS.CONNECTION_ERROR, (err) => {
      bakeToast({ type: "error", message: err.message });
    });

    return () => {
      socket.off(SocketConstants.EVENTS.INCOMING_CALL);
      socket.off(SocketConstants.EVENTS.INCOMING_ANSWER);
      socket.off(SocketConstants.EVENTS.NEW_ICE_CANDIDATE_RECEIVED);
      socket.off(SocketConstants.EVENTS.CALL_FAILED);
      socket.off(SocketConstants.EVENTS.CONNECTION_ERROR);
    };
  }, [socket]);

  useEffect(() => {
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

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
        <button onClick={closeModal}>Hang Up</button>
      </Modal>
    </>
  );
};

const openMediaDevices = async (constraints: MediaStreamConstraints) => {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.error("Error accessing media devices.", err);
    throw err;
  }
};

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
