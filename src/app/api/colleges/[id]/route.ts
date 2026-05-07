import { colleges, getCollegeBySlug } from "@/lib/colleges";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try to find by ID first
  const collegeById = colleges.find((c) => c.id === Number(id));
  if (collegeById) {
    return NextResponse.json(collegeById);
  }

  // Try to find by slug
  const collegeBySlug = getCollegeBySlug(id);
  if (collegeBySlug) {
    return NextResponse.json(collegeBySlug);
  }

  return NextResponse.json({ error: "College not found" }, { status: 404 });
}
