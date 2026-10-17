import Link from "next/link";
import { signup } from "../auth/actions";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-6">Sign up</h1>
      <form action={signup} className="space-y-3">
        <input
          name="name"
          placeholder="Name (optional)"
          className="border p-2 rounded block w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded block w-full"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password (6+ chars)"
          className="border p-2 rounded block w-full"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded w-full"
        >
          Create account
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}