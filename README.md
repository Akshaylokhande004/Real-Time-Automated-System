# Influencer Discovery & Outreach System

A Node.js + TypeScript pipeline that discovers creators, analyzes their content, matches them with brands, and automates outreach (email + DM).

---

## 🚀 Overview

This system simulates a modern creator intelligence platform used by brands to:

- Discover creators in real time  
- Understand their content (not just bio)  
- Match them with brand offerings  
- Generate personalized outreach  
- Execute outreach automatically  

---

## 🧠 Pipeline

Discovery → Enrichment → Content Intelligence → Matching → Personalization → Automation

---

## ⚙️ Features

- Multi-platform discovery (YouTube + Instagram)
- Content-aware classification (signals + domain detection)
- Brand–creator matching engine
- Collaboration strategy recommendation
- Personalized outreach generation
- Automated outreach execution

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- YouTube Data API
- Apify
- Nodemailer

---

---

# 📄 WORKFLOW DOCUMENT (COPY)

```text
1. Discovery
Fetch creators from YouTube and Instagram using keywords.

2. Enrichment
Add metadata like followers, engagement, segmentation.

3. Content Intelligence
Analyze titles and descriptions to extract signals and classify domain.

4. Filtering
Filter creators based on:
- follower range (5K–100K)
- India relevance
- keyword match
- activity level

5. Matching
Match creators with brand using:
- domain alignment
- content signals
- scoring

Assign collaboration strategies:
- finance → affiliate + sponsorship
- beauty → product trials + UGC
- fitness → ambassador programs
- education → affiliate + sponsorship

6. Personalization
Generate email and DM using creator content signals.

7. Automation
Send emails via SMTP and simulate DMs.

## ⚙️ Automation Flow
FOR each creator:
  IF email exists → send email
  ELSE → skip

  send DM

  wait 2 seconds

  log result

## 📌 Sample Creator Output

```json
{
  "name": "Dr. Priyanka Reddy",
  "platform": "youtube",
  "channelId": "UCQLCc-NqiWSVcz2LdU4xZ_w",
  "description": "Dr. Priyanka Reddy is a dermatologist and cosmetologist by profession. We not only talk about various topics related to health in general and skin in particular, but also talk about healthy lifestyle and healthy food recipes.",
  "profileLink": "https://www.youtube.com/channel/UCQLCc-NqiWSVcz2LdU4xZ_w",
  "followers": 737000,
  "videos": 706,
  "views": 595587187,
  "contentTitles": [
    "This is just a very basic skin care routine for oily acne prone skin.",
    "Most requested! Skincare routine for sensitive skin under Rs.1000/-"
  ],
  "engagement": 843608,
  "themes": ["skincare", "acne"],
  "niche": "beauty",
  "contentSignals": [
    "skincare routines",
    "dermatologist advice"
  ],
  "domain": "beauty",
  "brandFitUseCases": [
    "product trials",
    "expert campaigns"
  ],
  "collaborationTypes": [
    "product trials",
    "UGC partnerships",
    "paid sponsorship"
  ],
  "matchScore": 100,
  "outreach": {
    "email": "Hi Dr. Priyanka Reddy,\n\nYour recent posts caught our attention around skincare routines, and your work in the beauty space really stands out.\n\nAt Nykaa, we’d love to explore introducing our products to your audience with you. Your audience aligns well with what we’re building, and we believe this could create genuine value for them.\n\nLet me know if you’d be open to discussing this further.\n\nBest regards,\nTeam Nykaa",
    "instagramDM": "Hey Dr. Priyanka Reddy, really liked your posts on skincare routines! Would love to explore a collab with Nykaa—think your audience would find it super relevant."
  }
}

