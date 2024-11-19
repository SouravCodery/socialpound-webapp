import { CallCentral } from "@/components/call-central/call-central";
import { Sidebar } from "@/components/layout/sidebar/sidebar";

import { CallProvider } from "@/context/call.context";
import { SocketProvider } from "@/context/socket.context";

export default function SocialpoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <CallProvider>
        <Sidebar />
        {children}
        <CallCentral />
      </CallProvider>
    </SocketProvider>
  );
}
