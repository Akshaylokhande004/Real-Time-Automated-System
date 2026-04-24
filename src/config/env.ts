import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
export const APIFY_TOEKN = process.env.APIFY_TOEKN;
export const HF_TOKEN = process.env.HF_TOKEN;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
if (!YOUTUBE_API_KEY) {
  throw new Error("Missing YOUTUBE_API_KEY in .env");
}