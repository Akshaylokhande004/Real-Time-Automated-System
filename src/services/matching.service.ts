// Step 1: Define domains properly
export type Domain = "finance" | "beauty" | "education" | "fitness";

// Step 2: Brand type
export interface Brand {
  name: string;
  domain: Domain;
}
// Step 3: Brand use-case mapping (CORE LOGIC)
const BRAND_USE_CASES: Record<
  Domain,
  Record<string, string>
> = {
  finance: {
    "budgeting advice": "affiliate partnership",
    "investing basics": "app onboarding",
    "credit literacy": "credit card promotion"
  },

  beauty: {
    "skincare routines": "product trials",
    "dermatologist advice": "expert campaigns",
    "product reviews": "sponsored reviews"
  },

  education: {
    "exam preparation": "course promotion",
    "reasoning skills": "assessment ecosystem"
  },

  fitness: {
    "fitness training": "coaching programs",
    "nutrition guidance": "diet plans"
  }
};
// Step 4: Map creator signals → brand use-cases
function mapCreatorToBrand(
  creator: any,
  brand: Brand
): string[] {
  const mappings = BRAND_USE_CASES[brand.domain];

  const matchedUseCases: string[] = [];

  for (const signal of creator.contentSignals || []) {
    if (mappings[signal]) {
      matchedUseCases.push(mappings[signal]);
    }
  }

  return [...new Set(matchedUseCases)];
}

// Step 5: Calculate score (IMPORTANT)
function calculateFitScore(
  creator: any,
  brand: Brand
): number {
  const useCases = mapCreatorToBrand(creator, brand);

  let score = 0;

  // content relevance (core)
  score += useCases.length * 30;

  // domain alignment
  if (creator.domain === brand.domain) {
    score += 20;
  }

  // engagement weight
  if (creator.engagement > 50000) score += 20;
  else if (creator.engagement > 20000) score += 10;
  else score += 5;

  return score;
}

// Step 6: Final matching function
export function matchCreators(
  creators: any[],
  brand: Brand
) {
  return creators
    .map(c => {
      const useCases = mapCreatorToBrand(c, brand);

      return {
        ...c,
        brandFitUseCases: useCases,
        matchScore: calculateFitScore(c, brand),
        getCollaborationTypes:getCollaborationTypes(c.segment || "general")

      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
   
}

const COLLAB_STRATEGY_MAP: Record<string, string[]> = {
  investing: ["affiliate programs", "paid sponsorship"],
  budgeting: ["affiliate programs"],
  skincare: ["product trials", "UGC partnerships", "paid sponsorship"],
  makeup: ["product trials", "UGC partnerships"],
  fitness: ["ambassador programs", "paid sponsorship"],
  weightLoss: ["ambassador programs", "product trials"],
  education: ["affiliate programs", "paid sponsorship"],
  general: ["barter collaborations"]
};


 function getCollaborationTypes(segment: string): string[] {
  return COLLAB_STRATEGY_MAP[segment] || ["barter collaborations"];
}