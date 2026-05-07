import { NextResponse } from "next/server";
import { ExamType, CategoryType, predictAdmissionChance } from "@/lib/admission";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { exam, score, category } = body;

    if (!exam || score === undefined || !category) {
      return NextResponse.json(
        { error: "Missing required fields: exam, score, category" },
        { status: 400 }
      );
    }

    const validExams = ["JEE", "NEET", "CUET"];
    const validCategories = ["General", "OBC", "SC/ST"];

    if (!validExams.includes(exam) || !validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid exam or category" },
        { status: 400 }
      );
    }

    const prediction = predictAdmissionChance(
      exam as ExamType,
      Number(score),
      category as CategoryType
    );

    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
