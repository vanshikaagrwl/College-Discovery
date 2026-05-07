export type ExamType = "JEE" | "NEET" | "CUET";
export type CategoryType = "General" | "OBC" | "SC/ST";

export type AdmissionPrediction = {
  chance: "High" | "Medium" | "Low";
  scoreLabel: string;
  explanation: string;
  suggestedRange: string;
};

const admissionRules: Record<ExamType, Record<CategoryType, { high: number; medium: number; }>> = {
  JEE: {
    General: { high: 20000, medium: 60000 },
    OBC: { high: 40000, medium: 100000 },
    "SC/ST": { high: 80000, medium: 180000 },
  },
  CUET: {
    General: { high: 25000, medium: 70000 },
    OBC: { high: 50000, medium: 120000 },
    "SC/ST": { high: 100000, medium: 200000 },
  },
  NEET: {
    General: { high: 520, medium: 470 },
    OBC: { high: 505, medium: 445 },
    "SC/ST": { high: 470, medium: 400 },
  },
};

export function predictAdmissionChance(exam: ExamType, value: number, category: CategoryType): AdmissionPrediction {
  const rules = admissionRules[exam][category];

  if (exam === "NEET") {
    if (value >= rules.high) {
      return {
        chance: "High",
        scoreLabel: "score",
        explanation: `A NEET score of ${value} is in the strong range for ${category} category.`,
        suggestedRange: `${rules.medium + 1}–${rules.high - 1}`,
      };
    }

    if (value >= rules.medium) {
      return {
        chance: "Medium",
        scoreLabel: "score",
        explanation: `A NEET score of ${value} is moderate for your category; consider colleges with medium cutoffs.`,
        suggestedRange: `Approximately ${rules.medium}–${rules.high - 1}`,
      };
    }

    return {
      chance: "Low",
      scoreLabel: "score",
      explanation: `A NEET score of ${value} is below the medium range for ${category} category. Focus on colleges with higher acceptance or private seats.`,
      suggestedRange: `Below ${rules.medium}`,
    };
  }

  const rank = value;
  if (rank <= rules.high) {
    return {
      chance: "High",
      scoreLabel: "rank",
      explanation: `A ${exam} rank of ${rank} is strong for ${category} category.`,
      suggestedRange: `${rank} and above`,
    };
  }

  if (rank <= rules.medium) {
    return {
      chance: "Medium",
      scoreLabel: "rank",
      explanation: `A ${exam} rank of ${rank} is moderate; you have a decent chance for many private and mid-tier colleges.`,
      suggestedRange: `${rules.high + 1}–${rules.medium}`,
    };
  }

  return {
    chance: "Low",
    scoreLabel: "rank",
    explanation: `A ${exam} rank of ${rank} is on the lower side for competitive seats; consider broader options.`,
    suggestedRange: `Above ${rules.medium}`,
  };
}

export function getAdmissionTip(chance: AdmissionPrediction["chance"]): string {
  if (chance === "High") {
    return "You can focus on top-target colleges and shortlist based on course fit.";
  }
  if (chance === "Medium") {
    return "Look at private universities and state-level seats to maximize options.";
  }
  return "Consider broader options, management quota, and alternative courses while improving your rank/score.";
}
