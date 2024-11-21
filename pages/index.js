import { useSession, signIn } from "next-auth/react"; // For session and login
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.reload(); // Reload page after successful login
    }
    setLoading(false);
  };

  if (status === "loading")
    return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      {session ? (
        <>
          {/* Logged-in Homepage Content */}
          <header className="bg-primary text-white text-center py-5">
            <h1 className="display-4">Welcome to Favorite Cities</h1>
            <p className="lead">
              Discover, save, and explore your favorite cities worldwide!
            </p>
          </header>

          <section className="text-center my-5">
            <h2>Start Your Journey</h2>
            <p>Enter a city name to explore its details, weather, and more!</p>
            <Link href="/search">Search for Cities</Link>
          </section>
        </>
      ) : (
        <>
          {/* Login Form for Logged-Out Users */}
          <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form
              onSubmit={handleLogin}
              className="mx-auto"
              style={{ maxWidth: "400px" }}
            >
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-danger mt-3">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary btn-block mt-4"
                disabled={loading}
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
