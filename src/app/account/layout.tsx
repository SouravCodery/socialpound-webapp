import { FooterPublic } from "@/components/layout/footer-public/footer-public";

export default function AccountRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FooterPublic />
    </>
  );
}
