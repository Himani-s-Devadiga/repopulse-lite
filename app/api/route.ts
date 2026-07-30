import { NextResponse } from "next/server";
import { getRepository } from "@/lib/github";

export async function POST(request: Request) {
  try {

    const { owner, repo } = await request.json();

    const data = await getRepository(
      owner,
      repo
    );

    return NextResponse.json({
      success: true,
      repository: data
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch repository"
      },
      {
        status: 500
      }
    );
  }
}