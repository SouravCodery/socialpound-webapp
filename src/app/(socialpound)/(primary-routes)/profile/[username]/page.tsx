import { Profile } from "@/screens/profile/profile";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  return <Profile username={username} />;
}
