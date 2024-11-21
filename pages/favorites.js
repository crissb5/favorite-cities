import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LogoutButton from "@/components/LogoutButton";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    router.push("/"); // Redirect to sign-in page if not authenticated
  }
  return (
    <div className="container mt-5">
      <h1>Your Favorite Cities</h1>
      <p>Welcome, {session?.user?.name}</p>
      {/* Your favorites content goes here */}
    </div>
  );
}
