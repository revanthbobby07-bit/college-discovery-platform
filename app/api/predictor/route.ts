import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { error: "Request body must be a valid JSON object" },
        { status: 400 }
      );
    }

    const { rank, category } = body as Record<string, unknown>;

    // Validate rank: required, positive integer (> 0)
    if (
      rank === undefined ||
      rank === null ||
      typeof rank !== "number" ||
      !Number.isInteger(rank) ||
      rank <= 0
    ) {
      return NextResponse.json(
        { error: "Invalid 'rank' parameter: must be a positive integer" },
        { status: 400 }
      );
    }

    // Validate category: required, non-empty string after trim
    if (
      category === undefined ||
      category === null ||
      typeof category !== "string" ||
      category.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid 'category' parameter: must be a non-empty string" },
        { status: 400 }
      );
    }

    const trimmedCategory = category.trim();

    // Query cutoffs where user's rank <= cutoffRank (i.e. cutoffRank >= rank) and matching category
    const cutoffs = await db.orm.public.Cutoff
      .where((c) => c.cutoffRank.gte(rank))
      .where((c) => c.category.ilike(trimmedCategory))
      .orderBy((c) => c.cutoffRank.asc())
      .all();

    if (cutoffs.length === 0) {
      return NextResponse.json({
        data: [],
        count: 0,
        message: "No colleges found for the given rank and category.",
      });
    }

    // Extract unique college IDs and fetch college names
    const collegeIds = Array.from(new Set(cutoffs.map((c) => c.collegeId)));
    const colleges = await db.orm.public.College
      .where((col) => col.id.in(collegeIds))
      .all();

    const collegeMap = new Map<number, string>(
      colleges.map((col) => [col.id, col.name])
    );

    const data = cutoffs.map((c) => ({
      collegeId: c.collegeId,
      collegeName: collegeMap.get(c.collegeId) || "",
      courseName: c.courseName,
      category: c.category,
      cutoffRank: c.cutoffRank,
    }));

    return NextResponse.json({
      data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error predicting colleges:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
