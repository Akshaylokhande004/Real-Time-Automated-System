import axios from 'axios';
import { YOUTUBE_API_KEY } from "../config/env";
import { Creator } from "../types/creator.types";

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Step 1: serach videos using keywords

async function  searchVideos(keyword:string) {
    try{

        const res = await axios.get(`${BASE_URL}/search`, {
            params:{
                part: 'snippet',
                q: keyword,
                type: 'video',
                key: YOUTUBE_API_KEY,
                maxResults: 10
            }
    });
    return res.data.items;
    }catch(err){
        console.error('Error searching videos:', err);
        return [];
    }
    
}


 //STEP 2: Extract unique channel IDs
 
function extractChannelIds(videos: any[]): string[] {
  const ids = videos.map(v => v.snippet.channelId);
  return [...new Set(ids)];
}

//Step 3 : Fetch channel details
async function getChannelDetails(channelId:string[])
{
    if(channelId.length === 0) return [];
    try {
        const res = await axios.get(`${BASE_URL}/channels`, {
            params:{
                part: 'snippet,statistics',
                id: channelId.join(','),
                key: YOUTUBE_API_KEY
            }
    });
    return res.data.items;
    }catch(err){
        console.error('Error fetching channel details:', err);
        return [];
    }   
}


 // STEP 4: Normalize into Creator format
 
function normalizeCreators(
  channels: any[],
  allVideos: any[]
): Creator[] {
  return channels.map(ch => {
    //  Get videos belonging to this channel
    const channelVideos = allVideos.filter(
      v => v.snippet.channelId === ch.id
    );

    //  Extract titles
    const titles = channelVideos.map(v => v.snippet.title);

    return {
      name: ch.snippet.title,
      platform: "youtube",
      channelId: ch.id,
      description: ch.snippet.description || "",
      profileLink: `https://www.youtube.com/channel/${ch.id}`,
      followers: Number(ch.statistics.subscriberCount || 0),
      videos: Number(ch.statistics.videoCount || 0),
      views: Number(ch.statistics.viewCount || 0),

    
      contentTitles: titles
    };
  });
}

 // MAIN DISCOVERY FUNCTION

export async function discoverYouTubeCreators(
  keywords: string[]
): Promise<Creator[]> {
  let allVideos: any[] = [];

  for (const keyword of keywords) {
    const videos = await searchVideos(keyword);
    allVideos.push(...videos);
  }

  const channelIds = extractChannelIds(allVideos);
  const channels = await getChannelDetails(channelIds);

  return normalizeCreators(channels,allVideos);
}