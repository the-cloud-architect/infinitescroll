import { useState } from "react";
import { signIn } from "../lib/auth-client";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    await signIn.email(
      { email, password },
      {
        onSuccess() {
          window.location.href = "/";
        },
        onError(ctx) {
          setError(ctx.error?.message ?? "Unknown error");
        },
      }
    );
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log&nbsp;in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Sign&nbsp;in
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        New here?&nbsp;
        <a href="/signup" className="text-blue-600 underline">
          Create an account
        </a>
      </p>
    </div>
  );
}
