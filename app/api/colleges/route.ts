import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const search = searchParams.get("search")?.trim();
    const location = searchParams.get("location")?.trim();
    const minFeesParam = searchParams.get("minFees");
    const maxFeesParam = searchParams.get("maxFees");
    const minRatingParam = searchParams.get("minRating");

    // Validate page
    let page = 1;
    if (pageParam !== null) {
      const parsedPage = Number(pageParam);
      if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return NextResponse.json(
          { error: "Invalid 'page' parameter: must be an integer greater than or equal to 1" },
          { status: 400 }
        );
      }
      page = parsedPage;
    }

    // Validate limit
    let limit = 6;
    if (limitParam !== null) {
      const parsedLimit = Number(limitParam);
      if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 20) {
        return NextResponse.json(
          { error: "Invalid 'limit' parameter: must be an integer between 1 and 20" },
          { status: 400 }
        );
      }
      limit = parsedLimit;
    }

    // Validate minFees
    let minFees: number | undefined = undefined;
    if (minFeesParam !== null) {
      const parsedMinFees = Number(minFeesParam);
      if (isNaN(parsedMinFees) || parsedMinFees < 0) {
        return NextResponse.json(
          { error: "Invalid 'minFees' parameter: must be a valid non-negative number" },
          { status: 400 }
        );
      }
      minFees = parsedMinFees;
    }

    // Validate maxFees
    let maxFees: number | undefined = undefined;
    if (maxFeesParam !== null) {
      const parsedMaxFees = Number(maxFeesParam);
      if (isNaN(parsedMaxFees) || parsedMaxFees < 0) {
        return NextResponse.json(
          { error: "Invalid 'maxFees' parameter: must be a valid non-negative number" },
          { status: 400 }
        );
      }
      maxFees = parsedMaxFees;
    }

    if (minFees !== undefined && maxFees !== undefined && minFees > maxFees) {
      return NextResponse.json(
        { error: "Invalid parameters: 'minFees' cannot be greater than 'maxFees'" },
        { status: 400 }
      );
    }

    // Validate minRating
    let minRating: number | undefined = undefined;
    if (minRatingParam !== null) {
      const parsedMinRating = Number(minRatingParam);
      if (isNaN(parsedMinRating) || parsedMinRating < 0 || parsedMinRating > 5) {
        return NextResponse.json(
          { error: "Invalid 'minRating' parameter: must be a number between 0 and 5" },
          { status: 400 }
        );
      }
      minRating = parsedMinRating;
    }

    // Build database query with filters
    let query = db.orm.public.College;

    if (search) {
      query = query.where((c) => c.name.ilike(`%${search}%`));
    }
    if (location) {
      query = query.where((c) => c.location.ilike(`%${location}%`));
    }
    if (minFees !== undefined) {
      query = query.where((c) => c.fees.gte(minFees));
    }
    if (maxFees !== undefined) {
      query = query.where((c) => c.fees.lte(maxFees));
    }
    if (minRating !== undefined) {
      query = query.where((c) => c.rating.gte(minRating));
    }

    // Count total filtered records and apply pagination
    const { total } = await query.aggregate((c) => ({ total: c.count() }));
    const totalPages = Math.ceil(total / limit) || (total === 0 ? 0 : 1);

    const data = await query
      .orderBy([(c) => c.name.asc(), (c) => c.id.asc()])
      .limit(limit)
      .offset((page - 1) * limit)
      .all();

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}