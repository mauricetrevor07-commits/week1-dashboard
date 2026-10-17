"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 border border-red-300 rounded bg-red-50">
      <h2 className="text-red-700 font-bold">Something went wrong</h2>
      <p className="text-sm text-red-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-3 px-3 py-1 bg-red-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}