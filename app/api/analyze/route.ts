import { NextResponse } from "next/server";
import { getRepository } from "@/lib/github";
import { calculateScore } from "@/lib/score";
import { generateReport } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { owner, repo } = await request.json();

    if (!owner || !repo) {
      return NextResponse.json(
        {
          success: false,
          error: "Repository owner and name are required.",
        },
        {
          status: 400,
        }
      );
    }

    const repository = await getRepository(owner, repo);

    const healthScore = calculateScore(repository);

    const report = await generateReport({
      ...repository,
      healthScore,
    });

    return NextResponse.json({
      success: true,
      repository,
      healthScore,
      report,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}