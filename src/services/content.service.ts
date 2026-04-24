function getContentText(creator: any): string {
  return (
    (creator.contentTitles?.join(" ") || "") +
    " " +
    (creator.description || "")
  ).toLowerCase();
}


function extractContentSignals(text: string): string[] {
  const signals: string[] = [];

  // Finance
  if (text.includes("sip")) signals.push("investing basics");
  if (text.includes("mutual fund")) signals.push("long-term investing");
  if (text.includes("budget")) signals.push("budgeting advice");
  if (text.includes("credit")) signals.push("credit literacy");

  // Beauty
  if (text.includes("skincare")) signals.push("skincare routines");
  if (text.includes("dermatologist")) signals.push("dermatologist advice");
  if (text.includes("review")) signals.push("product reviews");

  // Fitness
  if (text.includes("workout")) signals.push("fitness training");
  if (text.includes("diet")) signals.push("nutrition guidance");

  // Education
  if (text.includes("exam")) signals.push("exam preparation");
  if (text.includes("reasoning")) signals.push("reasoning skills");

  return [...new Set(signals)];
}

function classifyDomain(signals: string[]): string {
  if (signals.some(s => s.includes("invest") || s.includes("budget"))) {
    return "finance";
  }

  if (signals.some(s => s.includes("skincare") || s.includes("dermatologist"))) {
    return "beauty";
  }

  if (signals.some(s => s.includes("fitness") || s.includes("nutrition"))) {
    return "fitness";
  }

  if (signals.some(s => s.includes("exam") || s.includes("reasoning"))) {
    return "education";
  }

  return "general";
}

export function analyzeContent(creator: any) {
  const text = getContentText(creator);

  const signals = extractContentSignals(text);

  const domain = classifyDomain(signals);

  return {
    ...creator,
    contentSignals: signals,
    domain
  };
}