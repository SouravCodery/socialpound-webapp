"use client";
import clsx from "clsx";
import classes from "./call-central.module.css";

import { useCall } from "@/context/call.context";
import { Modal } from "../modal/modal";
import { ProfilePicture } from "../profile-picture/profile-picture";
import { Spinner } from "../loaders/spinner/spinner";
import {
  AudioMuteIcon,
  AudioUnmuteIcon,
  CallAcceptIcon,
  CallRejectIcon,
  VideoMuteIcon,
  VideoUnmuteIcon,
} from "../icons/icons";
import { CallDuration } from "./call-duration/call-duration";

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
    isRemoteAudioMuted,
    isRemoteVideoMuted,

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
        mainExtraClasses={classes.incomingCallModalExtraClasses}
      >
        <div className={classes.incomingCall}>
          <div className={classes.incomingCallTitle}>Incoming Call</div>
          <div className={classes.caller}>
            <ProfilePicture dpURL={otherUser.profilePicture} scale="large" />
            <div className={classes.fullName}> {otherUser.fullName} </div>
            <div className={classes.username}>
              {otherUser?.username?.split("@")[0]}{" "}
            </div>
            <div className={classes.moreAboutCall}>
              Read more about calls in the About Us page.
            </div>
          </div>
          <div className={classes.callActionsContainer}>
            <button className={classes.callAction} onClick={rejectCall}>
              <CallRejectIcon />
            </button>
            <button className={classes.callAction} onClick={acceptCall}>
              <CallAcceptIcon />
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isModalOpen={isCallModalOpen}
        closeModal={endCall}
        mainExtraClasses={classes.callContainerModalExtraClasses}
      >
        <div className={classes.callContainer}>
          <div className={classes.videoContainer}>
            {!isCallConnecting && <CallDuration />}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={classes.video}
            />
            <div className={classes.name}>
              <div>{otherUser.fullName}</div>
              {isRemoteAudioMuted ? <AudioUnmuteIcon /> : ""}
              {isRemoteVideoMuted ? <VideoUnmuteIcon /> : ""}
            </div>
            {(isCallConnecting || isRemoteVideoMuted) && (
              <div className={classes.callConnecting}>
                <div className={classes.caller}>
                  <ProfilePicture
                    dpURL={otherUser.profilePicture}
                    scale="large"
                  />
                  {isCallConnecting ? (
                    <>
                      <br />
                      <Spinner />
                      <div className={classes.fullName}>
                        Calling {otherUser.fullName} ...
                      </div>
                    </>
                  ) : (
                    <div className={classes.fullName}>{otherUser.fullName}</div>
                  )}
                  <div className={classes.moreAboutCall}>
                    Read more about calls in the About Us page.
                  </div>
                </div>
              </div>
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
            {isCallConnecting === false && (
              <>
                <button onClick={toggleAudio} className={classes.controlButton}>
                  {isAudioMuted ? <AudioUnmuteIcon /> : <AudioMuteIcon />}
                </button>
                <button onClick={toggleVideo} className={classes.controlButton}>
                  {isVideoMuted ? <VideoUnmuteIcon /> : <VideoMuteIcon />}
                </button>
              </>
            )}
            <button onClick={endCall} className={classes.controlButton}>
              <CallRejectIcon />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Important Note: WebRTC-based calls on this platform rely on peer-to-peer connections. If either device is behind a strict firewall or network with restricted NAT settings, the call may not connect successfully. In such cases, additional network configurations or TURN servers are required, which are not currently implemented on this platform.
