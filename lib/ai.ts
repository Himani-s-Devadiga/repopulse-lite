import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateReport(repo: any) {
  try {
    const prompt = `
You are a Senior Software Engineering Architect.

Analyze this GitHub repository.

Repository:
${repo.full_name}

Description:
${repo.description}

Language:
${repo.language}

Stars:
${repo.stargazers_count}

Forks:
${repo.forks_count}

Open Issues:
${repo.openIssues}

Contributors:
${repo.contributorsCount}

Recent Commits:
${repo.recentCommits}

Health Score:
${repo.healthScore}/100

Commit Tier Breakdown:
Tier 1: ${repo.tierBreakdown?.tier1}
Tier 2: ${repo.tierBreakdown?.tier2}
Tier 3: ${repo.tierBreakdown?.tier3}

Generate a markdown report with:

# Executive Summary

# Development Momentum

# Operational Risks

# Commit Hygiene

# Recommendations

Keep it professional and concise.
`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content ?? "No report generated.";
  } catch (error) {
    console.error(error);
    return "Unable to generate AI report.";
  }
}