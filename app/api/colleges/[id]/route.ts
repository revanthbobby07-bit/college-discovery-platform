import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json(
        { error: "Invalid college ID parameter: must be a positive integer" },
        { status: 400 }
      );
    }

    const college = await db.orm.public.College.where({ id }).first();

    if (!college) {
      return NextResponse.json(
        { error: `College with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: college,
    });
  } catch (error) {
    console.error("Error fetching college details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
