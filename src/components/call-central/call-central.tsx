"use client";
import classes from "./call-central.module.css";

import { useCall } from "@/context/call.context";
import { Modal } from "../modal/modal";

export const CallCentral = () => {
  const {
    acceptCall,
    rejectCall,
    endCall,
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
  } = useCall();

  if (!otherUser) return null;

  return (
    <>
      <Modal isModalOpen={isIncomingCall} closeModal={rejectCall}>
        <div className={classes.incomingCallModal}>
          <p className={classes.callingText}>
            {otherUser.username} is calling you.
          </p>
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

      <Modal isModalOpen={isCallModalOpen} closeModal={endCall}>
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
            <div className={classes.remoteUsername}>{otherUser.username}</div>
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
            <button onClick={endCall} className={classes.endCallButton}>
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
