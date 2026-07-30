import { NextResponse } from "next/server";
import { getRepository } from "@/lib/github";
import { calculateScore } from "@/lib/score";
import { generateReport } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { owner, repo } = await request.json();

    const data = await getRepository(owner, repo);

    const healthScore = calculateScore(data);

    const report = await generateReport(data);

    return NextResponse.json({
      success: true,

      repository: {
        ...data,
        healthScore,
        report,
      },
    });

  } catch (error: any) {

    console.error("ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}