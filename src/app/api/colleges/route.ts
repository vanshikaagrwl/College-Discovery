import { colleges } from "@/lib/colleges";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const course = searchParams.get("course") || "";
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";
  const maxFees = searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : null;

  let filtered = colleges;

  if (query) {
    filtered = filtered.filter(
      (college) =>
        college.name.toLowerCase().includes(query) ||
        college.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (course) {
    filtered = filtered.filter((college) =>
      college.courses.some((c) => c.name === course)
    );
  }

  if (type) {
    filtered = filtered.filter((college) => college.type === type);
  }

  if (location) {
    filtered = filtered.filter(
      (college) => `${college.city}, ${college.state}` === location
    );
  }

  if (maxFees !== null) {
    filtered = filtered.filter((college) => college.feesRange[1] <= maxFees);
  }

  return NextResponse.json(filtered);
}
