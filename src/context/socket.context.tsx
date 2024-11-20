"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Constants } from "@/constants/constants";
import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    (async () => {
      const token = await apiSDKInstance.httpClient.getToken();

      const newSocket = io(Constants.API_BASE_URL, {
        auth: {
          token,
        },
      });

      setSocket(newSocket);
    })();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
