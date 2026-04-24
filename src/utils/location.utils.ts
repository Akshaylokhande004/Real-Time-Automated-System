



// type SignalGroup = {
//   name: string;
//   words: string[];
//   weight: number;
// };

// const SIGNAL_GROUPS: SignalGroup[] = [
//   {
//     name: "explicit_country",
//     words: ["india", "indian"],
//     weight: 40
//   },
//   {
//     name: "language",
//     words: ["hindi", "hinglish"],
//     weight: 25
//   },
//   {
//     name: "geo",
//     words: ["delhi", "mumbai", "bangalore", "pune", "chennai", "hyderabad"],
//     weight: 25
//   },
//   {
//     name: "institutions",
//     words: ["iit", "iim", "amfi", "nism", "nibm", "delhi university"],
//     weight: 30
//   },
//   {
//     name: "finance_ecosystem",
//     words: ["sip", "mutual fund", "nifty", "sensex", "upi"],
//     weight: 20
//   },
//   {
//     name: "media",
//     words: ["ndtv", "cnbc india", "mint", "entrepreneur india"],
//     weight: 20
//   },
//   {
//     name: "cultural",
//     words: ["lakh", "crore", "paisa", "kaise", "bhai"],
//     weight: 10
//   }
// ];
// export function getIndiaScore(creator: any): number {
//   const text = (
//     (creator.description || "") +
//     " " +
//     (creator.contentTitles?.join(" ") || "")
//   ).toLowerCase();

//   let totalScore = 0;
//   let matchedGroups = 0;

//   for (const group of SIGNAL_GROUPS) {
//     const matched = group.words.some(word => text.includes(word));

//     if (matched) {
//       totalScore += group.weight;
//       matchedGroups++;
//     }
//   }

//   //  normalize by diversity of signals
//   if (matchedGroups >= 3) totalScore += 15; // strong confidence
//   if (matchedGroups >= 5) totalScore += 10; // very strong

//   return Math.min(totalScore, 100);
// }

// export function getIndiaConfidence(score: number): string {
//   if (score >= 80) return "high";
//   if (score >= 50) return "medium";
//   return "low";
// }