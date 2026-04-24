import { Creator } from "../types/creator.types";

/**
 * Stronger, real-world segment rules
 */
const SEGMENT_RULES: Record<string, string[]> = {
  investing: [
    "investing", "sip", "mutual fund", "stocks", "stock market", "trading"
  ],
  budgeting: [
    "budgeting", "saving money", "expenses", "financial planning"
  ],
  skincare: [
    "skincare routine", "acne", "dermatologist", "skin care"
  ],
  makeup: [
    "makeup tutorial", "foundation", "lipstick", "beauty products"
  ],
  fitness: [
    "workout", "gym", "fitness routine", "exercise"
  ],
  weightLoss: [
    "fat loss", "weight loss", "diet plan"
  ],
  education: [
    "exam preparation", "study tips", "cbse", "jee", "neet"
  ]
};

/**
 * Combine creator text safely
 */
function getText(c: Creator): string {
  return (
    (c.description || "") +
    " " +
    (c.contentTitles?.join(" ") || "")
  ).toLowerCase();
}

/**
 * Segment creators using weighted keyword scoring
 */
export function segmentCreators(creators: Creator[]): Creator[] {
  return creators.map(c => {
    const text = getText(c);

    let bestSegment = "general";
    let maxScore = 0;
    let matchedKeywords: string[] = [];

    for (const [segment, keywords] of Object.entries(SEGMENT_RULES)) {
      let score = 0;
      const localMatches: string[] = [];

      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          // weight longer phrases higher
          score += keyword.length > 6 ? 2 : 1;
          localMatches.push(keyword);
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestSegment = segment;
        matchedKeywords = localMatches;
      }
    }

    return {
      ...c,
      segment: bestSegment,
      segmentScore: maxScore,
      contentSignals: matchedKeywords
    };
  });
}