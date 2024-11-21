import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevent automatic redirection
    router.push("/"); // Redirect to the homepage after logging out
  };

  return (
    <button className="btn btn-danger mt-3" onClick={handleLogout}>
      Log Out
    </button>
  );
}
