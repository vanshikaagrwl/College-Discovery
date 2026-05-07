/**
 * @jest-environment node
 */
import { predictAdmissionChance, getAdmissionTip } from "@/lib/admission";

describe("Admission Utilities", () => {
  describe("predictAdmissionChance", () => {
    describe("JEE - General Category", () => {
      test("Should return High chance for rank <= 20000", () => {
        const result = predictAdmissionChance("JEE", 15000, "General");
        expect(result.chance).toBe("High");
        expect(result.scoreLabel).toBe("rank");
      });

      test("Should return Medium chance for rank between 20001-60000", () => {
        const result = predictAdmissionChance("JEE", 40000, "General");
        expect(result.chance).toBe("Medium");
      });

      test("Should return Low chance for rank > 60000", () => {
        const result = predictAdmissionChance("JEE", 80000, "General");
        expect(result.chance).toBe("Low");
      });
    });

    describe("NEET - General Category", () => {
      test("Should return High chance for score >= 520", () => {
        const result = predictAdmissionChance("NEET", 550, "General");
        expect(result.chance).toBe("High");
        expect(result.scoreLabel).toBe("score");
      });

      test("Should return Medium chance for score 470-519", () => {
        const result = predictAdmissionChance("NEET", 490, "General");
        expect(result.chance).toBe("Medium");
      });

      test("Should return Low chance for score < 470", () => {
        const result = predictAdmissionChance("NEET", 450, "General");
        expect(result.chance).toBe("Low");
      });
    });

    describe("OBC Category", () => {
      test("JEE OBC should have different thresholds", () => {
        const result = predictAdmissionChance("JEE", 35000, "OBC");
        expect(result.chance).toBe("High"); // 35000 <= 40000
      });
    });

    describe("SC/ST Category", () => {
      test("JEE SC/ST should have different thresholds", () => {
        const result = predictAdmissionChance("JEE", 70000, "SC/ST");
        expect(result.chance).toBe("High"); // 70000 <= 80000
      });
    });

    describe("CUET Exam", () => {
      test("CUET should work with General category", () => {
        const result = predictAdmissionChance("CUET", 20000, "General");
        expect(result.chance).toBe("High");
      });
    });
  });

  describe("getAdmissionTip", () => {
    test("Should return High chance tip", () => {
      const tip = getAdmissionTip("High");
      expect(tip).toContain("top-target colleges");
    });

    test("Should return Medium chance tip", () => {
      const tip = getAdmissionTip("Medium");
      expect(tip).toContain("private universities");
    });

    test("Should return Low chance tip", () => {
      const tip = getAdmissionTip("Low");
      expect(tip).toContain("broader options");
    });
  });
});
