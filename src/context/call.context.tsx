"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";

import { useSocket } from "./socket.context";
import { bakeToast } from "@/components/toasts/toasts";

import { EventAcknowledgementCallbackParam } from "@/models/interfaces/socket.interface";
import { SocketConstants } from "@/constants/socket.constants";
import { SubDocumentUserInterface } from "@/models/interfaces/user.interface";

interface CallContextInterface {
  startCall: ({ user }: { user: SubDocumentUserInterface }) => Promise<void>;
  endCall: () => void;

  acceptCall: () => Promise<void>;
  rejectCall: () => void;

  toggleAudio: () => void;
  toggleVideo: () => void;

  isIncomingCall: boolean;
  isCallModalOpen: boolean;
  isCallConnecting: boolean;
  isAudioMuted: boolean;
  isVideoMuted: boolean;

  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  localVideoRef: React.RefObject<HTMLVideoElement>;

  callDuration: number;
  otherUser: SubDocumentUserInterface | null;
}

const CallContext = createContext<CallContextInterface | null>(null);

export const useCall = (): CallContextInterface => {
  const context = useContext(CallContext);

  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }

  return context;
};

export const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isCallConnecting, setIsCallConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [incomingCallData, setIncomingCallData] = useState<any>(null);
  const [otherUser, setOtherUser] = useState<SubDocumentUserInterface | null>(
    null
  );
  const [callTimeoutId, setCallTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection>();
  const roomIdRef = useRef<string>();
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const endCall = () => {
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
    setOtherUser(null);

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
        } catch (err) {
          console.error("Error adding buffered ice candidate", err);
        }
      }
      pendingCandidatesRef.current = [];
    }
  };

  const startCall = async ({ user }: { user: SubDocumentUserInterface }) => {
    try {
      if (!socket || socket.connected === false) {
        bakeToast({
          type: "error",
          message: "Call couldn't be initiated, Refresh and Retry",
        });
        return;
      }

      setIsCallModalOpen(true);
      setIsCallConnecting(true);
      setOtherUser(user);

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
            endCall();
          }
        }
      );
    } catch (error) {
      console.error("Error initiating call:", error);
      bakeToast({
        type: "error",
        message: "Call couldn't be initiated, Refresh and Retry",
      });
      endCall();
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
    setOtherUser(null);
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
      const { offer, roomId, callingUserId, user } = data;

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

      setIncomingCallData({ offer, roomId, callingUserId, user });
      setIsIncomingCall(true);
      setOtherUser(user);

      const timeoutId = setTimeout(() => {
        socket.emit(SocketConstants.EVENTS.CALL_UNANSWERED, {
          friendId: callingUserId,
          roomId,
        });

        setIsIncomingCall(false);
        setIncomingCallData(null);
        setOtherUser(null);
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
          } catch (err) {
            console.error("Error adding received ice candidate", err);
          }
        } else {
          pendingCandidatesRef.current.push(candidate);
        }
      }
    );

    socket.on(SocketConstants.EVENTS.CALL_REJECTED, (data) => {
      const { message } = data;

      bakeToast({ type: "error", message });
      endCall();
    });

    socket.on(SocketConstants.EVENTS.CALL_UNANSWERED, (data) => {
      const { message } = data;

      bakeToast({ type: "error", message });
      endCall();
    });

    socket.on(SocketConstants.EVENTS.CALL_FAILED, (data) => {
      const { message } = data;
      bakeToast({ type: "error", message });
      endCall();
    });

    socket.on(SocketConstants.EVENTS.CONNECTION_ERROR, (err) => {
      bakeToast({ type: "error", message: err.message });
      endCall();
    });

    socket.on(SocketConstants.EVENTS.CALL_ENDED, () => {
      bakeToast({ type: "info", message: "Call ended by the other user." });
      endCall();
    });

    socket.on(SocketConstants.EVENTS.CALL_BUSY, (data) => {
      const { message } = data;

      bakeToast({ type: "error", message });
      endCall();
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
  }, [socket]);

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

  return (
    <CallContext.Provider
      value={{
        startCall,
        endCall,

        acceptCall,
        rejectCall,

        toggleAudio,
        toggleVideo,

        isIncomingCall,
        isCallModalOpen,
        isCallConnecting,
        isAudioMuted,
        isVideoMuted,

        remoteVideoRef,
        localVideoRef,

        callDuration,
        otherUser,
      }}
    >
      {children}
    </CallContext.Provider>
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
