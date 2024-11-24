"use client";

import { useEffect, useRef, useState } from "react";
import classes from "./call.module.css";

import { UserInterface } from "@/models/interfaces/user.interface";
import { SocketConstants } from "@/constants/socket.constants";

import { Modal } from "../modal/modal";
import { bakeToast } from "../toasts/toasts";
import { useSocket } from "@/context/socket.context";
import { useSWRCheckFriendshipStatus } from "@/hooks/swr-hooks/friendship.swr-hooks";
import { EventAcknowledgementCallbackParam } from "@/models/interfaces/socket.interface";
import { logger } from "@/logger/index.logger";

export const Call = ({ user }: { user: UserInterface }) => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [incomingCallData, setIncomingCallData] = useState<any>(null);
  const [callTimeoutId, setCallTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isInCall, setIsInCall] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallConnecting, setIsCallConnecting] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection>();
  const roomIdRef = useRef<string>();
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

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
    if (socket && roomIdRef.current) {
      socket.emit(SocketConstants.EVENTS.CALL_ENDED, {
        roomId: roomIdRef.current,
      });
    }
    roomIdRef.current = undefined;

    setIsCallModalOpen(false);
    setIsIncomingCall(false);
    setIncomingCallData(null);
    setIsInCall(false);
    setCallDuration(0);
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

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

  const processPendingCandidates = async () => {
    if (pendingCandidatesRef.current.length > 0 && peerConnectionRef.current) {
      for (const candidate of pendingCandidatesRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
        } catch (error) {
          logger.error("Error in processPendingCandidates", error);
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

      setIsCallModalOpen(true);
      setIsCallConnecting(true);

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
          } else {
            closeModal();
          }
        }
      );
    } catch (error) {
      logger.error("Error in callFriend", error);
      bakeToast({
        type: "error",
        message: "Call couldn't be initiated, Refresh and Retry",
      });
      closeModal();
    }
  };

  const acceptCall = async () => {
    if (!incomingCallData || !socket) return;

    if (callTimeoutId) {
      clearTimeout(callTimeoutId);
      setCallTimeoutId(null);
    }

    setIsIncomingCall(false);
    setIsCallModalOpen(true);
    setIsInCall(true);

    const { offer, roomId, callingUserId } = incomingCallData;

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

    callTimerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const rejectCall = () => {
    if (!incomingCallData || !socket) return;

    if (callTimeoutId) {
      clearTimeout(callTimeoutId);
      setCallTimeoutId(null);
    }

    const { roomId, callingUserId } = incomingCallData;

    socket.emit(SocketConstants.EVENTS.CALL_REJECTED, {
      friendId: callingUserId,
      roomId,
    });

    setIsIncomingCall(false);
    setIncomingCallData(null);
  };

  const toggleAudio = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      (localVideoRef.current.srcObject as MediaStream)
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      (localVideoRef.current.srcObject as MediaStream)
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsVideoMuted(!isVideoMuted);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketConstants.EVENTS.INCOMING_CALL, async (data) => {
      const { offer, roomId, callingUserId } = data;

      if (!offer) {
        return;
      }

      if (isInCall) {
        socket.emit(SocketConstants.EVENTS.CALL_BUSY, {
          friendId: callingUserId,
          roomId,
        });

        return;
      }

      bakeToast({ type: "info", message: `${user.username} is calling you.` });

      setIncomingCallData({ offer, roomId, callingUserId });
      setIsIncomingCall(true);

      const timeoutId = setTimeout(() => {
        socket.emit(SocketConstants.EVENTS.CALL_UNANSWERED, {
          friendId: callingUserId,
          roomId,
        });

        setIsIncomingCall(false);
        setIncomingCallData(null);
        bakeToast({
          type: "error",
          message: `Missed call from ${user.username}.`,
        });
      }, 30000);
      setCallTimeoutId(timeoutId);
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
      setIsInCall(true);
      setIsCallConnecting(false);

      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    });

    socket.on(
      SocketConstants.EVENTS.NEW_ICE_CANDIDATE_RECEIVED,
      async (data) => {
        const { candidate } = data;

        if (!peerConnectionRef.current || !candidate) return;

        if (peerConnectionRef.current.remoteDescription) {
          try {
            await peerConnectionRef.current.addIceCandidate(candidate);
          } catch (error) {
            logger.error("Error in NEW_ICE_CANDIDATE_RECEIVED event", error);
          }
        } else {
          pendingCandidatesRef.current.push(candidate);
        }
      }
    );

    socket.on(SocketConstants.EVENTS.CALL_REJECTED, (data) => {
      const { message } = data;

      bakeToast({ type: "error", message });
      closeModal();
    });

    socket.on(SocketConstants.EVENTS.CALL_UNANSWERED, (data) => {
      const { message } = data;

      bakeToast({ type: "error", message });
      closeModal();
    });

    socket.on(SocketConstants.EVENTS.CALL_FAILED, (data) => {
      const { message } = data;
      bakeToast({ type: "error", message });
      closeModal();
    });

    socket.on(SocketConstants.EVENTS.CONNECTION_ERROR, (error) => {
      bakeToast({ type: "error", message: error.message });
      closeModal();
    });

    socket.on(SocketConstants.EVENTS.CALL_ENDED, () => {
      bakeToast({ type: "info", message: "Call ended by the other user." });
      closeModal();
    });

    socket.on(SocketConstants.EVENTS.CALL_BUSY, (data) => {
      const { message } = data;

      bakeToast({ type: "error", message });
      closeModal();
    });

    return () => {
      socket.off(SocketConstants.EVENTS.INCOMING_CALL);
      socket.off(SocketConstants.EVENTS.INCOMING_ANSWER);
      socket.off(SocketConstants.EVENTS.NEW_ICE_CANDIDATE_RECEIVED);
      socket.off(SocketConstants.EVENTS.CALL_REJECTED);
      socket.off(SocketConstants.EVENTS.CALL_UNANSWERED);
      socket.off(SocketConstants.EVENTS.CALL_FAILED);
      socket.off(SocketConstants.EVENTS.CONNECTION_ERROR);
      socket.off(SocketConstants.EVENTS.CALL_ENDED);
      socket.off(SocketConstants.EVENTS.CALL_BUSY);
    };
  }, [socket, isInCall]);

  useEffect(() => {
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  const formatCallDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((duration % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (duration % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <button className={classes.callButton} onClick={callFriend}>
        <i className="fas fa-video"></i> Call
      </button>

      {/* Incoming Call Notification Modal */}
      <Modal isModalOpen={isIncomingCall} closeModal={rejectCall}>
        <div className={classes.incomingCallModal}>
          <p className={classes.callingText}>{user.username} is calling you.</p>
          <div className={classes.callActions}>
            <button className={classes.acceptButton} onClick={acceptCall}>
              <i className="fas fa-phone"></i>
            </button>
            <button className={classes.rejectButton} onClick={rejectCall}>
              <i className="fas fa-phone-slash"></i>
            </button>
          </div>
        </div>
      </Modal>

      {/* Call Modal */}
      <Modal isModalOpen={isCallModalOpen} closeModal={closeModal}>
        <div className={classes.callContainer}>
          {isCallConnecting && (
            <div className={classes.callConnecting}>
              <p>Connecting...</p>
            </div>
          )}
          <div className={classes.remoteVideoContainer}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={classes.remoteVideo}
            />
            <div className={classes.remoteUsername}>{user.username}</div>
          </div>
          <div className={classes.localVideoContainer}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={classes.localVideo}
            />
            <div className={classes.localUsername}>You</div>
          </div>
          <div className={classes.callControls}>
            <button onClick={toggleAudio} className={classes.controlButton}>
              {isAudioMuted ? (
                <i className="fas fa-microphone-slash"></i>
              ) : (
                <i className="fas fa-microphone"></i>
              )}
            </button>
            <button onClick={toggleVideo} className={classes.controlButton}>
              {isVideoMuted ? (
                <i className="fas fa-video-slash"></i>
              ) : (
                <i className="fas fa-video"></i>
              )}
            </button>
            <button onClick={closeModal} className={classes.endCallButton}>
              <i className="fas fa-phone-slash"></i>
            </button>
          </div>
          <div className={classes.callDuration}>
            {formatCallDuration(callDuration)}
          </div>
        </div>
      </Modal>
    </>
  );
};

const openMediaDevices = async (constraints: MediaStreamConstraints) => {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    logger.error("Error in openMediaDevices", error);
    throw error;
  }
};

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
