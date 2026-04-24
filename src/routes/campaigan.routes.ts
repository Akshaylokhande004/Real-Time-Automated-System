import { Router } from "express";
import { runCampaign } from "../controllers/campaign.controller";

const router = Router();

// POST /api/campaign/run
router.post("/run", runCampaign);

export default router;