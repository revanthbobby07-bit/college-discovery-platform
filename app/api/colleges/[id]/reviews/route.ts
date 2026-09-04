import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const collegeId = Number(idParam);

    if (!Number.isInteger(collegeId) || collegeId < 1) {
      return NextResponse.json(
        { error: "Invalid college ID parameter: must be a positive integer" },
        { status: 400 }
      );
    }

    const college = await db.orm.public.College.where({ id: collegeId }).first();

    if (!college) {
      return NextResponse.json(
        { error: `College with ID ${collegeId} not found` },
        { status: 404 }
      );
    }

    const reviews = await db.orm.public.Review.where({ collegeId }).all();

    return NextResponse.json({
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching college reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
