import axios from "axios";
import { APIFY_TOEKN } from "../config/env";

export async function discoverInstagramCreators(keyword: string) {
  try {
    const response = await axios.post(
      `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items`,
      {
        search: keyword,
        resultsLimit: 5
      },
      {
        params: {
          token:APIFY_TOEKN
        }
      }
    );
    return response.data.map((item: any) => ({
        name:item.username || item.fullName || "Unknown_Creator",
        platform:"instagram",
        channelId: item.id || "unknown_id",
        description:item.bio || "",
        profileLink: `https://www.instagram.com/${item.username}`,
        followrs: item.followers || 0,
        videos: item.posts || 0,
        views: 0,
        contentTitles: []
    }));
  } catch (error) {
    console.error("Error fetching Instagram creators:", error);
    return [];
  } 
}
