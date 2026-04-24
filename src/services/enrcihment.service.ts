function calculateEngagementRate(creator: any): number {

    if(creator.platform === "instagram"){
        return Math.round(creator.followers * 0.05); // Approximate engagement for Instagram
    }
    const views = creator.views || 1; // Avoid division by zero
    const videos = creator.videos || 1; // Avoid division by zero
    const avgViews = views / videos;
    //simple engangment rate 
    return Math.round(avgViews);
}

function extractThemes(creator: any): string[] {
  const text = (
    (creator.description || "") +
    " " +
    (creator.contentTitles?.join(" ") || "")
  ).toLowerCase();

  const keywords = [
    "invest", "sip", "budget", "saving",
    "skincare", "acne", "makeup",
    "fitness", "gym", "workout",
    "exam", "study", "cbse"
  ];

  return keywords.filter(k => text.includes(k));
}

function classifyNiche(themes: string[]): string {
  if (themes.some(t => ["invest", "sip"].includes(t))) {
    return "finance - investing";
  }

  if (themes.some(t => ["skincare", "makeup"].includes(t))) {
    return "beauty";
  }

  if (themes.some(t => ["fitness", "gym"].includes(t))) {
    return "fitness";
  }

  if (themes.some(t => ["exam", "study"].includes(t))) {
    return "education";
  }

  return "general";
}

function extractEmail(description: string): string | null {
  if (!description) return null;

  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;

  const match = description.match(emailRegex);

  return match ? match[0] : null;
}

export function enrichCreators(creators: any[]) {
  return creators.map(c => {
    const themes = extractThemes(c);

    return {
      ...c,

      engagement: calculateEngagementRate(c),

      themes,

      niche: classifyNiche(themes),

      email: extractEmail(c.description)
    };
  });
}

