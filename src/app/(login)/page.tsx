"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      // Fake login delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Login with:", { email, password });
      // TODO: Replace with API call to your backend

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-primary)] font-[var(--font-primary)]">
      <div className="w-full max-w-md rounded-2xl bg-[#1a1a1a] p-8 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-red-500 to-orange-400">
            <span className="text-3xl font-bold text-white">M4E</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-center font-[var(--font-heading)] text-2xl text-white">
          Log In to your account
        </h2>

        {/* Error Message */}
        {error && (
          <p className="mt-4 rounded-md bg-red-500/20 p-2 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-[var(--font-secondary)] text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="hello.designveli@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-gray-100 focus:border-[var(--color-secondary)] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-[var(--font-secondary)] text-gray-300"
              >
                Password
              </label>
            </div>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-gray-100 focus:border-[var(--color-secondary)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer rounded-lg bg-red-500 py-2 font-[var(--font-secondaryh)] text-lg text-white transition ${
              loading ? "opacity-60" : "hover:bg-red-600"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-600"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-600"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => console.log("Google Login")}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-600 bg-black py-2 text-white transition hover:bg-[#111] cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-[var(--font-secondary)]">
            Log In with Google
          </span>
        </button>

        {/* Footer */}
      </div>
    </div>
  );
}
