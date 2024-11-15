export const SocketConstants = {
  EVENTS: {
    CALL_FRIEND: "call-friend",
    CALL_FAILED: "call-failed",
    CALL_ANSWER: "call-answer",

    INCOMING_CALL: "incoming-call",
    INCOMING_ANSWER: "incoming-answer",

    ANSWER_CALL: "answer-call",

    CONNECTION_ERROR: "connect_error",
    ERROR: "error",
  },
} as const;
