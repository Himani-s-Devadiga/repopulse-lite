import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

export async function getRepository(owner: string, repo: string) {
  // Repository Details
  const repoResponse = await github.get(`/repos/${owner}/${repo}`);

  // Contributors
  const contributorsResponse = await github.get(
    `/repos/${owner}/${repo}/contributors`
  );

  // Latest 20 commits
  const commitsResponse = await github.get(
    `/repos/${owner}/${repo}/commits?per_page=20`
  );

  const commits = commitsResponse.data;

  let tier1 = 0;
  let tier2 = 0;
  let tier3 = 0;

  const commitDetails = [];

  // Fetch detailed information for every commit
  for (const commit of commits) {
    const detail = await github.get(
      `/repos/${owner}/${repo}/commits/${commit.sha}`
    );

    const additions = detail.data.stats?.additions || 0;
    const deletions = detail.data.stats?.deletions || 0;
    const totalLines = additions + deletions;

    const files = detail.data.files || [];

    const fileCount = files.length;

    // Documentation detection
    const docsOnly =
      files.length > 0 &&
      files.every((file: any) => {
        const name = file.filename.toLowerCase();

        return (
          name.endsWith(".md") ||
          name.includes("readme") ||
          name.includes("docs")
        );
      });

    let tier = "Tier 1";

    if (docsOnly || totalLines < 50) {
      tier1++;
      tier = "Tier 1";
    } else if (
      totalLines >= 50 &&
      totalLines <= 250 &&
      fileCount < 5
    ) {
      tier2++;
      tier = "Tier 2";
    } else {
      tier3++;
      tier = "Tier 3";
    }

    commitDetails.push({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      additions,
      deletions,
      totalLines,
      filesChanged: fileCount,
      tier,
    });
  }

  return {
    ...repoResponse.data,

    contributorsCount: contributorsResponse.data.length,

    recentCommits: commits.length,

    openIssues: repoResponse.data.open_issues_count,

    license:
      repoResponse.data.license?.name || "No License",

    updatedAt: repoResponse.data.updated_at,

    commitDetails,

    tierBreakdown: {
      tier1,
      tier2,
      tier3,
    },
  };
}