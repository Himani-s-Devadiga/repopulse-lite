import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "@/lib/github";
import { calculateScore } from "@/lib/score";
import { generateReport } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { owner, repo, provider } = await request.json();

    // Validate input
    if (!owner || !repo) {
      return NextResponse.json(
        {
          success: false,
          error: "GitHub repository owner and name are required.",
        },
        { status: 400 }
      );
    }

    // Fetch repository
    const repository = await getRepository(owner, repo);

    // Calculate repository health
    const healthScore = calculateScore(repository);

    // Generate AI report
    const report = await generateReport(repository, provider);

    return NextResponse.json({
      success: true,
      repository: {
        ...repository,
        healthScore,
      },
      healthScore,
      report,
    });
  } catch (error: any) {
    console.error("Analysis Error:", error);

    // GitHub Repository Not Found
    if (error.response?.status === 404) {
      return NextResponse.json(
        {
          success: false,
          error: "Repository not found. Please check the GitHub URL.",
        },
        { status: 404 }
      );
    }

    // GitHub Rate Limit
    if (error.response?.status === 403) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GitHub API rate limit exceeded. Please try again later.",
        },
        { status: 403 }
      );
    }

    // Unauthorized Token
    if (error.response?.status === 401) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid GitHub Personal Access Token.",
        },
        { status: 401 }
      );
    }

    // AI Provider Error
    if (error.message?.toLowerCase().includes("openai")) {
      return NextResponse.json(
        {
          success: false,
          error: "AI provider is currently unavailable.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while analyzing the repository.",
      },
      { status: 500 }
    );
  }
}