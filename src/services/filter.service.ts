import { Creator } from "../types/creator.types";
// filter by followers range(5k-100k)

function filterByFollowers(creators: Creator[]): Creator[] {
  return creators.filter(
    c => c.followers >= 5000 && c.followers <= 100000
  );
}

// basic India Coutry Filter

function filterByCountry(creators: Creator[]): Creator[] {
    return creators.filter(c => {
    const text = (c.description || "").toLowerCase();

    return (
      text.includes("india") ||
      text.includes("indian") ||
      text.includes("hindi") ||
      text.includes("delhi") ||
      text.includes("mumbai") ||
      text.includes("bangalore")||
      text.includes("kolkata") ||
      text.includes("chennai") ||
      text.includes("hyderabad") ||
      text.includes("pune")
    );
  }
    );
 

}

 // Content relevance (keyword matching)
 
function filterByKeywords(
  creators: Creator[],
  keywords: string[]
): Creator[] {

  // flatten keywords into tokens
  const tokens = keywords
    .join(" ")
    .toLowerCase()
    .split(" ");

  return creators.filter(c => {
    const text = (
      (c.description || "") +
      " " +
      (c.contentTitles?.join(" ") || "")
    ).toLowerCase();

    return tokens.some(token => text.includes(token));
  });
}
// combine all filters 

export function filterCreators(
  creators: Creator[],
  keywords: string[]
): Creator[] {
  let result = creators;
  console.log("Initial creators:",creators.length);
  result = filterByFollowers(result);
  console.log("After follower filter:", result.length);
  result = filterByCountry(result);
  console.log("After country filter:", result.length);

  result = filterByKeywords(result, keywords);
  console.log("After keyword filter:", result.length);

  return result;
}

const SEGMENT_RULES = {
  investing: ["invest", "sip", "stocks", "trading"],
  budgeting: ["budget", "saving", "expenses"],
  skincare: ["skincare", "acne", "dermatologist"],
  makeup: ["makeup", "foundation", "lipstick"],
  fitness: ["workout", "gym", "fitness", "exercise"],
  weightLoss: ["fat loss", "weight loss", "diet"],
  education: ["exam", "olympiad", "study", "cbse"]
};

export function segmentCreators(creators: Creator[]) {
  return creators.map(c => {
    const text = (
  c.description +
  " " +
  (c.contentTitles?.join(" ") || "")
).toLowerCase();

    let bestSegment = "general";
    let maxScore = 0;

    for (const [segment, keywords] of Object.entries(SEGMENT_RULES)) {
      let score = 0;

      for (const keyword of keywords) {
        if (text.includes(keyword)) score++;
      }

      if (score > maxScore) {
        maxScore = score;
        bestSegment = segment;
      }
    }

    return {
      ...c,
      segment: bestSegment
    };
  });
}