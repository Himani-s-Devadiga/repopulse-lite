"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      alert("Please enter a GitHub repository URL.");
      return;
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl: repoUrl,
        }),
      });

      const data = await response.json();

      alert(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      alert("Failed to connect to API.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          RepoPulse Lite
        </h1>

        <p className="mt-4 text-center text-gray-600">
          AI-Powered GitHub Repository Analyzer
        </p>

        <p className="mt-2 text-center text-gray-500">
          Analyze repository health, commit quality, and engineering insights.
        </p>

        <div className="mt-8 flex gap-4">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/owner/repository"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAnalyze}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Analyze
          </button>
        </div>
      </div>
    </main>
  );
}