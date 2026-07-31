export function calculateScore(repo: any): number {
  let score = 100;

  // Repository popularity
  if (repo.stargazers_count < 100) score -= 10;
  else if (repo.stargazers_count < 1000) score -= 5;

  // Open issues
  if (repo.openIssues > 1000) score -= 20;
  else if (repo.openIssues > 500) score -= 10;
  else if (repo.openIssues > 100) score -= 5;

  // Contributors
  if (repo.contributorsCount < 5) score -= 20;
  else if (repo.contributorsCount < 20) score -= 10;

  // Recent commits
  if (repo.recentCommits < 5) score -= 20;
  else if (repo.recentCommits < 10) score -= 10;

  // Commit complexity
  const tiers = repo.tierBreakdown;

  if (tiers) {
    if (tiers.tier3 > 10) score -= 10;
    if (tiers.tier1 > tiers.tier2 + tiers.tier3) score += 5;
  }

  // Keep score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return score;
}