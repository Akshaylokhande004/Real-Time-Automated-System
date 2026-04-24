function generateEmail(creator: any, brand: any): string {
  const niche = creator.domain;
  const theme = creator.contentSignals?.[0] || "your recent content";

  const rawUseCase = creator.brandFitUseCases?.[0];
  const value = formatUseCase(rawUseCase);

  const openings = [
    "I recently came across your content",
    "I've been following your work",
    "Your recent posts caught our attention"
  ];

  const opening =
    openings[Math.floor(Math.random() * openings.length)];

  return `Hi ${creator.name},

${opening} around ${theme}, and your work in the ${niche} space really stands out.

At ${brand.name}, we’d love to explore ${value} with you. Your audience aligns well with what we’re building, and we believe this could create genuine value for them.

Let me know if you’d be open to discussing this further.

Best regards,  
Team ${brand.name}`;
}

function generateDM(creator: any, brand: any): string {
  const theme = creator.contentSignals?.[0] || "your content";

  return `Hey ${creator.name}, really liked your posts on ${theme}! Would love to explore a collab with ${brand.name}—think your audience would find it super relevant.`;
}

const openings = [
  "I recently came across your content",
  "I've been following your work",
  "Your recent posts caught our attention"
];

const valueLines = [
  "this aligns perfectly with our campaign goals",
  "we see strong synergy with our platform",
  "your audience is highly relevant for us"
];

export function generateOutreach(creators: any[], brand: any) {
  return creators.map(c => ({
    ...c,
    outreach: {
      email: generateEmail(c, brand),
      instagramDM: generateDM(c, brand)
    }
  }));
}

function formatUseCase(useCase: string): string {
  const map: Record<string, string> = {
    "affiliate partnership": "collaborating through affiliate campaigns",
    "app onboarding": "helping users discover and start investing on our platform",
    "credit card promotion": "educating users about smart credit usage",

    "product trials": "introducing our products to your audience",
    "sponsored reviews": "creating authentic product reviews",

    "course promotion": "promoting learning programs",
    "assessment ecosystem": "building awareness around skill development tools"
  };

  return map[useCase] || "a meaningful collaboration";
}