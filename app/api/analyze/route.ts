import { NextRequest, NextResponse } from "next/server";
import { getRepository } from "@/lib/github";
import { calculateScore } from "@/lib/score";
import { generateReport } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const owner = body.owner;
    const repo = body.repo;
    const provider = body.provider || "groq";

    if (!owner || !repo) {
      return NextResponse.json(
        {
          success: false,
          error: "GitHub repository owner and name are required.",
        },
        { status: 400 }
      );
    }

    const repository = await getRepository(owner, repo);

    const healthScore = calculateScore(repository);

    const report = await generateReport(
      repository,
      provider
    );

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

    return NextResponse.json(
      {
        success: false,
        error:
          error.message ||
          "Something went wrong while analyzing repository.",
      },
      { status: 500 }
    );
  }
}