import { Sidebar } from "@/components/layout/sidebar/sidebar";

export default function SocialpoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
