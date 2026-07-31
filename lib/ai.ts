import OpenAI from "openai";

export async function generateReport(
  repository: any,
  provider: string = "groq"
) {
  try {
    let apiKey = "";
    let baseURL = "";
    let model = "";

    // Select AI Provider
    if (provider === "groq") {
      apiKey = process.env.GROQ_API_KEY || "";
      baseURL = "https://api.groq.com/openai/v1";
      model = "llama-3.3-70b-versatile";
    } 
    else if (provider === "openai") {
      apiKey = process.env.OPENAI_API_KEY || "";
      baseURL = "https://api.openai.com/v1";
      model = "gpt-4o-mini";
    } 
    else {
      throw new Error("Unsupported AI provider");
    }


    if (!apiKey) {
      throw new Error(`${provider} API key missing`);
    }


    const client = new OpenAI({
      apiKey,
      baseURL,
    });


    const prompt = `
You are a senior software engineer.

Analyze this GitHub repository and generate a detailed report.

Repository Details:
Name: ${repository.name}
Description: ${repository.description}
Language: ${repository.language}
Stars: ${repository.stars}
Forks: ${repository.forks}

Provide:
1. Project overview
2. Code quality analysis
3. Strengths
4. Weaknesses
5. Security concerns
6. Improvement suggestions
7. Overall rating
`;


    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You analyze GitHub repositories professionally.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });


    return (
      response.choices[0]?.message?.content ||
      "No report generated."
    );


  } catch (error: any) {
    console.error("AI Report Error:", error);
    throw error;
  }
}