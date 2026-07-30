import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function generateReport(repo:any){

  const prompt = `
You are a senior software engineer.

Analyze this GitHub repository:

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

Contributors:
${repo.contributorsCount}

Recent Commits:
${repo.recentCommits}


Generate an engineering report with:

1. Executive Summary
2. Strengths
3. Weaknesses
4. Recommendation

Keep it concise.
`;


const response = await groq.chat.completions.create({

  messages:[
    {
      role:"user",
      content:prompt
    }
  ],

  model:"llama-3.3-70b-versatile"

});


return response.choices[0].message.content;

}