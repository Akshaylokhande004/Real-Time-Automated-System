export interface Creator {
  name: string;
  platform: string;
  channelId: string;
  description: string;
  profileLink: string;

  followers: number;
  videos: number;
  views: number;

  contentTitles?: string[];

  // 🌍 Location intelligence
  indiaScore?: number;
  indiaConfidence?: string;

  // 📊 segmentation + enrichment
  segment?: string;
  engagement?: number;
  niche?: string;

  // 🧠 content intelligence
  contentSignals?: string[];
  domain?: string;

  // 🎯 matching
  brandFitUseCases?: string[];
  matchScore?: number;

  // 📬 outreach
  email?: string;
  outreach?: {
    email: string;
    instagramDM: string;
  };

  // ⚙️ internal fields (optional)
  _keywordScore?: number;
  _indiaScore?: number;
  _isActive?: boolean;
}