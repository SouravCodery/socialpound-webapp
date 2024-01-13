import { Auth } from "@/components/auth/auth";
import { auth } from "@/root/auth";

export default async function Page() {
  const session = await auth();
  console.log({ session });

  const isLoggedIn = !!session;

  return <Auth isLoggedIn={isLoggedIn} />;
}