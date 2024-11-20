"use client";
import clsx from "clsx";
import classes from "./call-central.module.css";

import { useCall } from "@/context/call.context";
import { Modal } from "../modal/modal";
import { ProfilePicture } from "../profile-picture/profile-picture";

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

    otherUser,
  } = useCall();

  if (!otherUser) return null;

  return (
    <>
      <Modal
        isModalOpen={isIncomingCall}
        closeModal={rejectCall}
        mainExtraClasses={classes.modalExtraClasses}
      >
        <div className={classes.incomingCall}>
          <div className={classes.incomingCallTitle}>Incoming Call</div>
          <div className={classes.caller}>
            <ProfilePicture dpURL={otherUser.profilePicture} scale="large" />
            <div className={classes.fullName}> {otherUser.fullName} </div>
            <div className={classes.username}>
              {otherUser?.username?.split("@")[0]}{" "}
            </div>
          </div>
          <div className={classes.callActionsContainer}>
            <button className={classes.callAction} onClick={rejectCall}>
              ❌
            </button>
            <button className={classes.callAction} onClick={acceptCall}>
              ✅
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isModalOpen={isCallModalOpen}
        closeModal={endCall}
        mainExtraClasses={classes.modalExtraClasses}
      >
        <div className={classes.callContainer}>
          <div className={classes.videoContainer}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={classes.video}
            />
            <div className={classes.name}>{otherUser.fullName}</div>
            {isCallConnecting && (
              <div className={classes.callConnecting}>Calling...</div>
            )}
          </div>
          <div
            className={clsx(
              classes.videoContainer,
              classes.localVideoContainer
            )}
          >
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={classes.video}
            />
            <div className={classes.name}>You</div>
          </div>
          <div className={classes.callControls}>
            <button onClick={toggleAudio} className={classes.controlButton}>
              {isAudioMuted ? (
                <i className="fas fa-microphone-slash"></i>
              ) : (
                <i className="fas fa-microphone"></i>
              )}
              🎙️
            </button>
            <button onClick={toggleVideo} className={classes.controlButton}>
              {isVideoMuted ? (
                <i className="fas fa-video-slash"></i>
              ) : (
                <i className="fas fa-video"></i>
              )}
              🎥
            </button>
            <button onClick={endCall} className={classes.controlButton}>
              <i className="fas fa-phone-slash"></i>❌
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
