import { SubDocumentUserInterface } from "./user.interface";

export interface CallContextInterface {
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
  isRemoteAudioMuted: boolean;
  isRemoteVideoMuted: boolean;

  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  localVideoRef: React.RefObject<HTMLVideoElement>;

  otherUser: SubDocumentUserInterface | null;
}
