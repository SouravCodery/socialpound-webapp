import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { SocketProvider } from "@/context/socket.context";

export default function SocialpoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <Sidebar />
      {children}
    </SocketProvider>
  );
}
