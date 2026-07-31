"use client";

import { useMemo, useState } from "react";

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  filesChanged: number;
  totalLines: number;
  tier: string;
}

interface CommitTableProps {
  commits: Commit[];
}

export default function CommitTable({ commits }: CommitTableProps) {
  const [search, setSearch] = useState("");

  const filteredCommits = useMemo(() => {
    return commits.filter(
      (commit) =>
        commit.message.toLowerCase().includes(search.toLowerCase()) ||
        commit.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [commits, search]);

  const tier1 = commits.filter((c) => c.tier === "Tier 1").length;
  const tier2 = commits.filter((c) => c.tier === "Tier 2").length;
  const tier3 = commits.filter((c) => c.tier === "Tier 3").length;

  const badgeColor = (tier: string) => {
    switch (tier) {
      case "Tier 1":
        return "bg-green-500/20 text-green-400 border border-green-500";
      case "Tier 2":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500";
      case "Tier 3":
        return "bg-red-500/20 text-red-400 border border-red-500";
      default:
        return "bg-slate-700 text-white";
    }
  };

  if (!commits || commits.length === 0) {
    return (
      <div className="mt-10 bg-slate-900 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold">
          📋 Commit Hygiene Audit
        </h2>

        <p className="text-slate-400 mt-4">
          No commit information available.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">

      <div className="p-6 border-b border-slate-800">

        <div className="flex flex-col md:flex-row justify-between gap-5">

          <div>
            <h2 className="text-3xl font-bold">
              📋 Commit Hygiene Audit
            </h2>

            <p className="text-slate-400 mt-2">
              Recent repository activity analysis
            </p>
          </div>

          <input
            type="text"
            placeholder="Search commit or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white md:w-80"
          />

        </div>

        <div className="flex flex-wrap gap-4 mt-6">

          <div className="bg-slate-800 rounded-xl px-5 py-3">
            <p className="text-slate-400 text-sm">
              Total Commits
            </p>
            <h3 className="text-2xl font-bold">
              {commits.length}
            </h3>
          </div>

          <div className="bg-green-500/15 rounded-xl px-5 py-3 border border-green-500">
            <p className="text-green-400 text-sm">
              Tier 1
            </p>
            <h3 className="text-xl font-bold">
              {tier1}
            </h3>
          </div>

          <div className="bg-yellow-500/15 rounded-xl px-5 py-3 border border-yellow-500">
            <p className="text-yellow-400 text-sm">
              Tier 2
            </p>
            <h3 className="text-xl font-bold">
              {tier2}
            </h3>
          </div>

          <div className="bg-red-500/15 rounded-xl px-5 py-3 border border-red-500">
            <p className="text-red-400 text-sm">
              Tier 3
            </p>
            <h3 className="text-xl font-bold">
              {tier3}
            </h3>
          </div>

        </div>

      </div>

      <div className="overflow-auto max-h-[650px]">

        <table className="w-full">

          <thead className="sticky top-0 bg-slate-950">

            <tr className="text-slate-400 border-b border-slate-800">

              <th className="px-4 py-4 text-left">
                SHA
              </th>

              <th className="px-4 py-4 text-left">
                Commit Message
              </th>

              <th className="px-4 py-4 text-left">
                Author
              </th>

              <th className="px-4 py-4 text-center">
                Files
              </th>

              <th className="px-4 py-4 text-center">
                Lines
              </th>

              <th className="px-4 py-4 text-center">
                Date
              </th>

              <th className="px-4 py-4 text-center">
                Tier
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCommits.map((commit) => (

              <tr
                key={commit.sha}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="px-4 py-4 font-mono text-cyan-400">
                  {commit.sha.substring(0,7)}
                </td>

                <td className="px-4 py-4 text-white max-w-md">
                  {commit.message}
                </td>

                <td className="px-4 py-4 text-slate-300">
                  {commit.author}
                </td>

                <td className="px-4 py-4 text-center">
                  {commit.filesChanged}
                </td>

                <td className="px-4 py-4 text-center">
                  {commit.totalLines}
                </td>

                <td className="px-4 py-4 text-center text-slate-400">
                  {new Date(commit.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(commit.tier)}`}
                  >
                    {commit.tier}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}