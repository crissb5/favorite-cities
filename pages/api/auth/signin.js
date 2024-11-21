import { signIn } from "next-auth/react"; // NextAuth's signIn method
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      // Redirect user after successful sign-in
      router.push("/"); // Redirect to homepage (or the page they were trying to access)
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Sign In</h1>
      <form
        onSubmit={handleSubmit}
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
  );
}
